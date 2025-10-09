// src/components/QuizGenerator.jsx
import React, { useState } from "react";

const QuizGenerator = () => {
  const [pdfText, setPdfText] = useState("");
  const [questions, setQuestions] = useState([]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const arrayBuffer = await file.arrayBuffer();
    // Using pdfjs-dist for browser PDF parsing
    const pdfjsLib = await import("pdfjs-dist/build/pdf");
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;

    const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
    let textContent = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const strings = content.items.map((item) => item.str).join(" ");
      textContent += strings + "\n";
    }

    setPdfText(textContent);
    generateQuestions(textContent);
  };

  const generateQuestions = (text) => {
    // Simple mock: split text into sentences and make each a "question"
    const sentences = text.split(".").slice(0, 5); // take first 5 sentences for demo
    const qs = sentences.map((s, i) => ({
      question: `Q${i + 1}: What does this sentence mean? - "${s.trim()}"`,
      answer: "",
    }));
    setQuestions(qs);
  };

  const handleAnswerChange = (index, value) => {
    const newQs = [...questions];
    newQs[index].answer = value;
    setQuestions(newQs);
  };

  const handleSubmit = () => {
    let score = 0;
    questions.forEach((q) => {
      if (q.answer.trim() !== "") score += 1; // simple scoring: non-empty = 1 point
    });
    alert(`You scored ${score} / ${questions.length}`);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Upload PDF & Generate Quiz</h2>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileUpload}
        className="border p-2 rounded-lg mb-4"
      />

      {questions.length > 0 && (
        <div className="space-y-4">
          {questions.map((q, idx) => (
            <div key={idx}>
              <p className="font-semibold">{q.question}</p>
              <input
                type="text"
                value={q.answer}
                onChange={(e) => handleAnswerChange(idx, e.target.value)}
                className="border p-2 rounded-lg w-full"
              />
            </div>
          ))}
          <button
            onClick={handleSubmit}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Submit Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizGenerator;
