import express from "express";
const router = express.Router();

// Predefined responses
const sampleAnswers = {
  "what is physics": "Physics is the fundamental science that studies matter, energy, and the laws of nature.",
  "define force": "A force is a push or pull acting upon an object that can change its motion or shape.",
  "give an example of energy": "Examples of energy include sunlight, electricity, moving vehicles, and food energy.",
  "measurements are important": "Measurements help us to quantify observations and make experiments accurate and reliable.",
  "what is the primary focus of physics": "The main focus of physics is to understand the behavior of matter and energy in the universe."
};

// POST route for chatbot messages
router.post("/", (req, res) => {
  const userMessage = req.body.message?.toLowerCase() || "";
  let reply = "Sorry, I don’t have an answer for that yet.";

  for (const key in sampleAnswers) {
    if (userMessage.includes(key)) {
      reply = sampleAnswers[key];
      break;
    }
  }

  res.json({ reply });
});

export default router;
