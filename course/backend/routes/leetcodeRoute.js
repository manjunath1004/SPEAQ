import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.post("/question", async (req, res) => {
  const { titleSlug } = req.body;

  const query = `
    query questionData($titleSlug: String!) {
      question(titleSlug: $titleSlug) {
        title
        content
        difficulty
        likes
        dislikes
        exampleTestcases
      }
    }
  `;

  try {
    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ operationName: "questionData", variables: { titleSlug }, query }),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("❌ LeetCode Fetch Error:", error.message);
    res.status(500).json({ error: "Failed to fetch LeetCode question" });
  }
});

export default router;