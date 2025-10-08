import express from "express";
import multer from "multer";
import PDF from "../models/PDF.js";

const router = express.Router();
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

router.post("/upload", upload.single("pdf"), async (req, res) => {
  try {
    const pdf = new PDF({
      title: req.body.title,
      filename: req.file.filename,
      uploadedBy: req.body.userId
    });
    await pdf.save();
    res.json({ message: "PDF uploaded", pdf });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/list", async (req, res) => {
  const pdfs = await PDF.find();
  res.json(pdfs);
});

export default router;
