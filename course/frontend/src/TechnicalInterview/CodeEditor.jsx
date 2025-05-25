import React, { useState, useEffect } from "react";

const questionSlugs = [
    "two-sum",
  "add-two-numbers",
  "longest-substring-without-repeating-characters",
  "median-of-two-sorted-arrays",
  "longest-palindromic-substring",
  "zigzag-conversion",
  "reverse-integer",
  "string-to-integer-atoi",
  "palindrome-number",
  "regular-expression-matching",
  "container-with-most-water",
  "integer-to-roman",
  "roman-to-integer",
  "longest-common-prefix",
  "3sum",
  "3sum-closest",
  "letter-combinations-of-a-phone-number",
  "4sum",
  "remove-nth-node-from-end-of-list",
  "valid-parentheses",
  "merge-two-sorted-lists",
  "generate-parentheses",
  "merge-k-sorted-lists",
  "swap-nodes-in-pairs",
  "reverse-nodes-in-k-group",
  "remove-duplicates-from-sorted-array",
  "remove-element",
  "implement-strstr",
  "divide-two-integers",
  "substring-with-concatenation-of-all-words",
  "next-permutation",
  "longest-valid-parentheses",
  "search-in-rotated-sorted-array",
  "find-first-and-last-position-of-element-in-sorted-array",
  "search-insert-position",
  "valid-sudoku",
  " Sudoku Solver", 
  "count-and-say",
  "combination-sum",
  "first-missing-positive",
  "trapping-rain-water",
  "multiply-strings",
  "wildcard-matching",
  "jump-game-ii",
  "permutations",
  "rotate-image",
  "group-anagrams",
  "powx-n",
  "subsets",
  "word-search",
  "remove-linked-list-elements",
  "linked-list-cycle",
  "merge-two-binary-trees",
  "invert-binary-tree",
  "maximum-depth-of-binary-tree",
  "diameter-of-binary-tree",
  "balanced-binary-tree",
  "binary-tree-level-order-traversal",
  "convert-sorted-array-to-binary-search-tree",
  "minimum-depth-of-binary-tree",
  "path-sum",
  "sum-root-to-leaf-numbers",
  "flatten-binary-tree-to-linked-list",
  "populating-next-right-pointers-in-each-node",
  "same-tree",
  "symmetric-tree",
  "binary-tree-preorder-traversal",
  "binary-tree-inorder-traversal",
  "binary-tree-postorder-traversal",
  "construct-binary-tree-from-preorder-and-inorder-traversal",
  "construct-binary-tree-from-inorder-and-postorder-traversal",
  "validate-binary-search-tree",
  "kth-smallest-element-in-a-bst",
  "lowest-common-ancestor-of-a-binary-search-tree",
  "binary-search-tree-iterator",
  "recover-binary-search-tree",
  "unique-binary-search-trees",
  "unique-binary-search-trees-ii",
  "path-sum-ii",
  "sum-root-to-leaf-numbers",
  "flatten-binary-tree-to-linked-list",
  "populating-next-right-pointers-in-each-node-ii",
  "edit-distance",
  "climbing-stairs",
  "simplify-path",
  "set-matrix-zeroes",
  "search-a-2d-matrix",
  "sort-colors",
  "minimum-path-sum",
  "valid-palindrome",
  "word-break",
  "linked-list-cycle-ii",
  "reverse-linked-list",
  "binary-tree-zigzag-level-order-traversal",
  "friend-circles",
  "number-of-islands",
  "maximum-subarray"
];

// Judge0 language IDs: https://ce.judge0.com/languages
const languageOptions = [
  { id: 71, name: "Python 3" },
  { id: 62, name: "Java" },
  { id: 63, name: "JavaScript (Node.js)" },
  { id: 54, name: "C++" },
  { id: 50, name: "C" },
  { id: 68, name: "Go" },
  // Add more if you want
];

export default function App() {
  const [question, setQuestion] = useState(null);
  const [loadingQuestion, setLoadingQuestion] = useState(false);
  const [code, setCode] = useState(`# Write your code here`);
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);
  const [languageId, setLanguageId] = useState(languageOptions[0].id);

  const fetchRandomQuestion = async () => {
    setLoadingQuestion(true);
    setOutput("");
    const randomSlug = questionSlugs[Math.floor(Math.random() * questionSlugs.length)];

    try {
      const res = await fetch("http://localhost:5000/api/question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titleSlug: randomSlug }),
      });
      const json = await res.json();
      if (json.data && json.data.question) {
        setQuestion(json.data.question);
      } else {
        setQuestion(null);
        alert("Failed to fetch question data.");
      }
    } catch (e) {
      alert("Error fetching question.");
      setQuestion(null);
    } finally {
      setLoadingQuestion(false);
    }
  };

  useEffect(() => {
    fetchRandomQuestion();
  }, []);

  const runCode = async () => {
    setRunning(true);
    setOutput("Running code...");

    const source_code = code;
    const language_id = languageId;

    try {
      const response = await fetch(
  "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-RapidAPI-Key": "31a2b6a9d1msh41c574832cadcd2p178c9cjsn0affe1511b1d",
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    },
    body: JSON.stringify({
      source_code: code,
      language_id: languageId,
    }),
  }
);
      const result = await response.json();

      if (result.stdout) setOutput(result.stdout);
      else if (result.stderr) setOutput(result.stderr);
      else if (result.compile_output) setOutput(result.compile_output);
      else setOutput("No output");
    } catch (error) {
      setOutput("Error running code");
    } finally {
      setRunning(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: "#f0f2f5",
            marginTop: "60px", // <-- Add this line

      }}
    >
      {/* Left panel: Question info */}
      <div
        style={{
          flex: 1,
          padding: 24,
          borderRight: "2px solid #ddd",
          overflowY: "auto",
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {loadingQuestion && <p style={{ fontSize: 18, color: "#666" }}>Loading Question...</p>}

        {question ? (
          <>
            <h1
              style={{
                marginBottom: 12,
                fontWeight: "700",
                fontSize: 28,
                lineHeight: "1.2",
                color: "#222",
              }}
            >
              {question.title}{" "}
              <span
                style={{
                  fontSize: 16,
                  fontWeight: "400",
                  color: "#666",
                  marginLeft: 14,
                }}
              >
                ({question.difficulty})
              </span>
            </h1>

            <p
              style={{
                marginBottom: 12,
                fontSize: 16,
                color: "#555",
                fontWeight: "500",
              }}
            >
              👍 {question.likes} | 👎 {question.dislikes}
            </p>

            <div
              style={{
                flexGrow: 1,
                overflowY: "auto",
                fontSize: 16,
                lineHeight: 1.6,
                color: "#333",
                paddingRight: 12,
                
              }}
              dangerouslySetInnerHTML={{ __html: question.content }}
            />

            <pre
              style={{
                backgroundColor: "#f5f7fa",
                padding: 16,
                borderRadius: 8,
                whiteSpace: "pre-wrap",
                marginTop: 24,
                maxHeight: 180,
                overflowY: "auto",
                boxShadow: "inset 0 0 5px rgba(0,0,0,0.1)",
                fontSize: 14,
                color: "#222",
              }}
            >
              {question.exampleTestcases}
            </pre>
          </>
        ) : (
          !loadingQuestion && (
            <p
              style={{
                fontSize: 18,
                color: "#666",
                marginTop: 60,
                textAlign: "center",
              }}
            >
              Failed to load question.
            </p>
          )
        )}
      </div>

      {/* Right panel: Code editor and output */}
      <div
        style={{
          flex: 1,
          padding: 24,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#fff",
          boxShadow: "-4px 0 6px -2px rgba(0,0,0,0.1)",
        }}
      >
        <select
          value={languageId}
          onChange={(e) => setLanguageId(Number(e.target.value))}
          style={{
            marginBottom: 12,
            fontSize: 16,
            padding: "8px 12px",
            borderRadius: 6,
            border: "1px solid #ccc",
            maxWidth: 200,
          }}
        >
          {languageOptions.map((lang) => (
            <option key={lang.id} value={lang.id}>
              {lang.name}
            </option>
          ))}
        </select>

        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          style={{
            flexGrow: 1,
            fontFamily: "monospace",
            fontSize: 16,
            padding: 20,
            borderRadius: 8,
            border: "1px solid #ccc",
            resize: "none",
            minHeight: 320,
            boxShadow: "0 0 10px rgba(0,0,0,0.05)",
          }}
        />

        <button
          onClick={runCode}
          disabled={running}
          style={{
            marginTop: 20,
            padding: "14px 30px",
            fontSize: 18,
            backgroundColor: running ? "#94d3a2" : "#28a745",
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: running ? "not-allowed" : "pointer",
            alignSelf: "flex-start",
            boxShadow: running ? "none" : "0 3px 7px rgba(40,167,69,0.5)",
            transition: "background-color 0.3s ease",
          }}
        >
          {running ? "Running..." : "Run Code ▶"}
        </button>

        <pre
          style={{
            marginTop: 24,
            backgroundColor: "#1e1e1e",
            color: "#0f0",
            fontFamily: "monospace",
            padding: 20,
            borderRadius: 8,
            minHeight: 180,
            overflowY: "auto",
            whiteSpace: "pre-wrap",
            boxShadow: "0 0 10px #0f0",
          }}
        >
          {output}
        </pre>
      </div>
    </div>
  );
}