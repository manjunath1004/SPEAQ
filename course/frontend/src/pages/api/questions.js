export default async function handler(req, res) {
  const { topic, level } = req.query;

  try {
    const externalApiUrl = `https://example.com/api/questions?topic=${topic}&level=${level}`;
    const response = await fetch(externalApiUrl);

    if (!response.ok) throw new Error("External API Failed");

    const data = await response.json();

    res.status(200).json({ questions: data.questions });
  } catch (error) {
    console.error("External API failed:", error.message);
    res.status(500).json({ error: "External API fetch failed" });
  }
}
