// index.js (or app.js, whatever your main file is)

// 1️⃣ Import dependencies
import express from "express"; // or const express = require("express");
import cors from "cors";

// 2️⃣ Initialize app
const app = express();

// 3️⃣ Middleware
app.use(cors());
app.use(express.json());

// 4️⃣ Routes
app.get("/", (req, res) => {
  res.send("Hello from backend!");
});

// 5️⃣ Start server
const PORT = process.env.PORT || 5000;
const openaiKey = process.env.OPENAI_API_KEY;
const mongoURI = process.env.MONGO_URI;
 // <-- here
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // <-- here
