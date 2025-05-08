import React, { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import axios from "axios";

function App() {
  const [question, setQuestion] = useState(null);
  const [code, setCode] = useState("# Write your solution here");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  // Mock API for random coding question
  const fetchQuestion = async () => {
    // You can replace this with real backend later
    const mockQuestions = [
      {
        id: 1,
        title: "Sum of Two Numbers",
        description: "Write a program to take two integers and print their sum.",
        input: "2 3",
        output: "5",
      },
      {
        id: 2,
        title: "Factorial",
        description: "Write a program to compute factorial of a given number.",
        input: "5",
        output: "120",
      },
    ];
    const random = Math.floor(Math.random() * mockQuestions.length);
    setQuestion(mockQuestions[random]);
  };

  const runCode = async () => {
    setLoading(true);
    setOutput("Running...");

    const options = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",
      params: { base64_encoded: "false", wait: "true" },
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "YOUR_RAPID_API_KEY",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
      data: {
        language_id: 71, // Python 3
        source_code: code,
        stdin: question.input,
      },
    };

    try {
      const res = await axios.request(options);
      setOutput(res.data.stdout || res.data.stderr || "No output");
    } catch (err) {
      setOutput("Error executing code");
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  return (
    <div className="min-h-screen flex text-white bg-gray-900">
      <div className="w-1/2 p-6 border-r border-gray-700">
        <h1 className="text-2xl font-bold mb-4">{question?.title}</h1>
        <p className="mb-4">{question?.description}</p>
        <div className="mb-2">
          <strong>Input:</strong> <pre>{question?.input}</pre>
        </div>
        <div className="mb-2">
          <strong>Expected Output:</strong> <pre>{question?.output}</pre>
        </div>
        <button
          onClick={fetchQuestion}
          className="mt-4 bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-700"
        >
          Get New Question
        </button>
      </div>

      <div className="w-1/2 p-6 flex flex-col">
        <CodeMirror
          value={code}
          height="400px"
          extensions={[python()]}
          theme="dark"
          onChange={(val) => setCode(val)}
        />
        <button
          onClick={runCode}
          className="mt-4 bg-green-600 px-4 py-2 rounded hover:bg-green-700"
          disabled={loading}
        >
          {loading ? "Running..." : "Run Code"}
        </button>

        <div className="mt-4">
          <h3 className="text-lg font-semibold">Output:</h3>
          <pre className="bg-black p-4 rounded mt-2">{output}</pre>
        </div>
      </div>
    </div>
  );
}

export default App;
