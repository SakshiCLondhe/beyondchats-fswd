import express from "express";
import { generateQuizFromPDF } from "../services/openaiService.js";
import QuizAttempt from "../models/QuizAttempt.js";

const router = express.Router();

router.post("/generate", async (req, res) => {
  try {
    const { pdfText } = req.body;
    const quiz = await generateQuizFromPDF(pdfText);
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/submit", async (req, res) => {
  try {
    const attempt = new QuizAttempt(req.body);
    await attempt.save();
    res.json({ message: "Quiz submitted", attempt });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
