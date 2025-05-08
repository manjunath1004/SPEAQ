import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";

const questions = [
  "Hi! What's your name?",
  "Tell me about yourself.",
  "Why do you want this job?",
  "What are your strengths?",
  "What are your weaknesses?",
  "Where do you see yourself in 5 years?"
];

const HrInterviewPage = () => {
  const [step, setStep] = useState("welcome"); // welcome, interview, complete, analysis
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [listening, setListening] = useState(false);

  const webcamRef = useRef(null);
  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);

  // Cleanup when unmounting or changing step
  useEffect(() => {
    return () => {
      stopSpeech();
      stopListening();
    };
  }, []);

  // Stop TTS (Text to Speech)
  const stopSpeech = () => {
    if (synthRef.current && synthRef.current.speaking) {
      synthRef.current.cancel();
    }
  };

  // Text to Speech
  const speak = (text, callback) => {
    stopSpeech();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.onend = () => {
      if (callback) callback();
    };
    synthRef.current.speak(utterance);
  };

  // Stop Speech Recognition
  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.onresult = null;
      recognitionRef.current.onerror = null;
      recognitionRef.current.stop();
      recognitionRef.current = null;
      setListening(false);
    }
  };

  // Speech Recognition
  const startListening = () => {
    stopListening(); // Clean up before starting

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in your browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onresult = (event) => {
      const userAnswer = event.results[0][0].transcript;
      setAnswers((prev) => [...prev, userAnswer]);

      if (questionIndex + 1 < questions.length) {
        setTimeout(() => {
          setQuestionIndex((prev) => prev + 1);
        }, 800);
      } else {
        setTimeout(() => {
          setStep("complete");
        }, 1200);
      }

      stopListening();
    };

    recognition.onerror = (e) => {
      console.error("Recognition error:", e);
      stopListening();
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  useEffect(() => {
    if (step === "interview" && questions[questionIndex]) {
      speak(questions[questionIndex], () => {
        startListening();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionIndex, step]);

  const handleStartInterview = () => {
    setStep("interview");
    setQuestionIndex(0);
    setAnswers([]);
  };

  const handleExit = () => {
    stopSpeech();
    stopListening();
    setStep("welcome");
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      {step === "welcome" && (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-6">
            🚀 Ready for your Mock HR Interview?
          </h1>
          <button
            onClick={handleStartInterview}
            className="bg-green-600 px-6 py-3 rounded-lg text-lg hover:bg-green-700 transition"
          >
            I'm Ready!
          </button>
        </div>
      )}

      {step === "interview" && (
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-xl font-semibold mb-2">
            🎙️ Answer the question below:
          </h2>
          <p className="text-lg bg-white text-black p-4 rounded-lg shadow-md w-full max-w-md">
            {questions[questionIndex]}
          </p>

          <Webcam
            audio={true}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode: "user" }}
            className="rounded-lg shadow-lg w-[320px] h-[240px]"
          />

          {listening && (
            <p className="text-green-400 mt-2 animate-pulse">🎧 Listening...</p>
          )}

          <button
            onClick={handleExit}
            className="mt-4 text-sm text-red-400 hover:text-red-600"
          >
            ❌ Exit Interview
          </button>
        </div>
      )}

      {step === "complete" && (
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">✅ Interview Complete!</h2>
          <button
            onClick={() => setStep("analysis")}
            className="bg-blue-600 px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition"
          >
            View My Analytics
          </button>
        </div>
      )}

      {step === "analysis" && (
        <div className="text-left max-w-lg w-full">
          <h2 className="text-2xl font-bold mb-4">📊 Your Interview Analytics</h2>
          <ul className="space-y-3">
            {answers.map((ans, idx) => (
              <li key={idx} className="bg-white text-black p-3 rounded shadow-md">
                <strong>{questions[idx]}</strong>
                <br />
                <em>Your answer:</em> {ans}
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <p>🗣️ Voice Tone: Moderate</p>
            <p>🧠 Answer Quality: Decent</p>
            <p>🎯 Improvement: Try more structure in your answers</p>
            <p>😊 Expression: Neutral (basic — can improve with face analysis)</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HrInterviewPage;
