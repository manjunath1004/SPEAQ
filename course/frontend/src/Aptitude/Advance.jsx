import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Advance() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0); // Initialize score

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/questions/advanced');
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleNext = () => {
    const currentQuestion = questions[currentIndex];

    // Increment score if the selected option is correct
    if (selectedOption === currentQuestion.answer) {
      setScore(prev => prev + 1);
    }

    // Move to the next question or finish the test
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null); // Reset selected option for the next question
    } else {
      const finalScore = score + (selectedOption === currentQuestion.answer ? 1 : 0);
      alert(`Test Completed!\nYour Score: ${finalScore} / ${questions.length}`);
      navigate('/aptitude-test'); // Navigate to the aptitude-test page
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedOption(null); // Reset selected option when going back
    } else {
      navigate('/aptitude-test');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading questions...</div>;
  }

  if (!questions.length) {
    return <div className="text-center py-8">No questions found for Advanced level</div>;
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="mt-16 p-5 flex flex-col items-center justify-center">
      <div className="text-center mb-10">
        <h1 className="text-2xl font-bold">Aptitude Questions</h1>
        <h4 className="text-2xl font-semibold">Advanced Level</h4>
        <p className="mt-2">Question {currentIndex + 1} of {questions.length}</p>
      </div>

      {/* Display Score */}
      <p className="text-right w-full max-w-md mb-4 text-gray-600 font-medium">
        Score: {score} / {questions.length}
      </p>

      <div className="w-full max-w-md mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">{currentQuestion.question}</h2>
          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                className={`w-full text-left p-3 rounded-lg border ${
                  selectedOption === option 
                    ? 'bg-blue-100 border-blue-500' 
                    : 'hover:bg-gray-50 border-gray-200'
                }`}
                onClick={() => setSelectedOption(option)} // Set selected option
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-4">
        <button 
          onClick={handleBack}
          className="bg-red-600 text-white rounded-lg px-6 py-2 hover:bg-red-700 transition-colors"
        >
          Back
        </button>
        <button 
          onClick={handleNext}
          disabled={!selectedOption}
          className={`rounded-lg px-6 py-2 ${
            selectedOption
              ? 'bg-green-500 hover:bg-green-600 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {currentIndex === questions.length - 1 ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
}

export default Advance;
