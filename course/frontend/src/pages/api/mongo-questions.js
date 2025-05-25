import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  const { topic, level } = req.query;

  try {
    await client.connect();
    const db = client.db("interview");
    const collection = db.collection("questions");

    const questions = await collection
      .find({ topic, level })
      .project({ _id: 0 })
      .toArray();

    res.status(200).json({ questions });
  } catch (error) {
    console.error("MongoDB fallback failed:", error.message);
    res.status(500).json({ error: "MongoDB fetch failed" });
  } finally {
    await client.close();
  }
}
