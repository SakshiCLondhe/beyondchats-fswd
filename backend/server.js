import express from "express";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// This is the route that handles chat messages
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: message }],
    });
    res.json({ reply: response.choices[0].message.content });
  } catch (err) {
    console.error(err);
    // Fallback mock response if quota exceeded or API fails
    res.json({ reply: "Sorry, the OpenAI quota is reached. This is a mock response." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
