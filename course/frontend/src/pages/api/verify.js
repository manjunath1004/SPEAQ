export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { code, language } = req.body;

  try {
    const payload = {
      script: code,
      language: language,
      versionIndex: "0",
      clientId: process.env.JDOODLE_CLIENT_ID,
      clientSecret: process.env.JDOODLE_CLIENT_SECRET,
    };

    const response = await fetch("https://api.jdoodle.com/v1/execute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    res.status(200).json({ output: result.output });
  } catch (err) {
    console.error("Code verification failed:", err.message);
    res.status(500).json({ error: "Verification failed" });
  }
}
