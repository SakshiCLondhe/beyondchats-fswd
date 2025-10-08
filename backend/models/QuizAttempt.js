import mongoose from "mongoose";

const quizAttemptSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  pdf: { type: mongoose.Schema.Types.ObjectId, ref: "PDF" },
  score: Number,
  total: Number,
  answers: [{ question: String, userAnswer: String, correctAnswer: String }],
  attemptedAt: { type: Date, default: Date.now }
});

export default mongoose.model("QuizAttempt", quizAttemptSchema);
