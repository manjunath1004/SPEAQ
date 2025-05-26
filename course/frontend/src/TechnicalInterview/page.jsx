import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import CodeEditor from "./CodeEditor";

const Page = () => {
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchQuestions = async () => {
    if (!selectedTopic || !selectedLevel) return;

    setLoading(true);
    setError("");
    try {
      // Try external API
      const res = await fetch(`/api/questions?topic=${selectedTopic}&level=${selectedLevel}`);
      if (!res.ok) throw new Error("External API failed");
      const data = await res.json();

      if (!data.questions || data.questions.length === 0) throw new Error("Empty from API");
      setQuestions(data.questions);
    } catch (err) {
      // Fallback to MongoDB
      try {
        const resMongo = await fetch(`/api/mongo-questions?topic=${selectedTopic}&level=${selectedLevel}`);
        if (!resMongo.ok) throw new Error("MongoDB fetch failed");
        const dataMongo = await resMongo.json();

        if (!dataMongo.questions || dataMongo.questions.length === 0) {
          setError("No questions found for the selected topic and level.");
          setQuestions([]);
        } else {
          setQuestions(dataMongo.questions);
        }
      } catch (errorMongo) {
        console.error("Both API and MongoDB fetch failed:", errorMongo);
        setError("Something went wrong. Please try again later.");
        setQuestions([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleStart = async () => {
    if (!selectedTopic || !selectedLevel) {
      alert("Please select both topic and level.");
      return;
    }
    await fetchQuestions();
    if (!error) {
      navigate("/CodeEditor");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1117] text-white p-6">
      {!questions.length ? (
        <div className="max-w-md mx-auto mt-20 bg-gray-900 p-6 rounded-xl shadow-lg">
          <h1 className="text-2xl text-cyan-400 mb-4 font-bold text-center">🧠 Technical Interview</h1>

          <div className="mb-4">
            <label className="block mb-2 text-gray-300">Select Topic:</label>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white"
            >
              <option value="">-- Choose a Topic --</option>
              <option value="python">Python</option>
              <option value="javascript">JavaScript</option>
              <option value="java">Java</option>
              <option value="c++">C++</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-gray-300">Select Level:</label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white"
            >
              <option value="">-- Choose a Level --</option>
              <option value="basic">Basic</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <button
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 px-4 rounded"
            onClick={handleStart}
            disabled={loading}
          >
            {loading ? "Loading..." : "🚀 Start Interview"}
          </button>

          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        </div>
      ) : (
        <div>
          <h2 className="text-xl text-white mb-4">
            Questions for {selectedTopic} - {selectedLevel}
          </h2>
          {loading ? (
            <div className="text-center text-cyan-400">Loading questions...</div>
          ) : (
            <div className="space-y-6">
              {questions.map((q, i) => (
                <CodeEditor key={i} question={q} language={selectedTopic} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
