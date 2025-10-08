import mongoose from "mongoose";

const pdfSchema = new mongoose.Schema({
  title: String,
  filename: String,
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  uploadedAt: { type: Date, default: Date.now }
});

export default mongoose.model("PDF", pdfSchema);
