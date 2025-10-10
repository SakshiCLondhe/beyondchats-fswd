import React, { useState } from "react";

const QuizGenerator = () => {
  const [pdfText, setPdfText] = useState("");
  const [questions, setQuestions] = useState([]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const arrayBuffer = await file.arrayBuffer();
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
  };

  const generateQuestions = (text) => {
    if (!text) return alert("Please upload a PDF first!");
    const sentences = text.split(".").slice(0, 5);
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
      if (q.answer.trim() !== "") score += 1;
    });
    alert(`You scored ${score} / ${questions.length}`);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-6 bg-gradient-to-r from-green-100 to-green-200 rounded-2xl shadow-xl mt-6">
      
      {/* Header */}
      <h2 className="text-3xl font-extrabold text-green-700 mb-4 text-center">
        Upload  PDF & Generate Quiz
      </h2>
      <p className="text-center text-gray-700 mb-6">
        Upload your PDF and generate 4–5 sample questions automatically. Try answering them to test your knowledge!
      </p>

      {/* File Upload */}
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileUpload}
        className="border p-3 rounded-lg w-full mb-4 shadow-sm hover:shadow-md transition"
      />

      {/* Generate Quiz Button */}
      <button
        onClick={() => generateQuestions(pdfText)}
        className="mb-6 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition shadow-lg"
      >
        Generate Quiz
      </button>

      {/* Questions */}
      {questions.length > 0 && (
        <div className="w-full space-y-4">
          {questions.map((q, idx) => (
            <div
              key={idx}
              className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition"
            >
              <p className="font-semibold text-gray-800 mb-2">{q.question}</p>
              <input
                type="text"
                value={q.answer}
                onChange={(e) => handleAnswerChange(idx, e.target.value)}
                className="border p-2 rounded-lg w-full focus:ring-2 focus:ring-green-400 focus:outline-none"
                placeholder="Type your answer here..."
              />
            </div>
          ))}

          <button
            onClick={handleSubmit}
            className="mt-4 w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-bold transition shadow-md"
          >
            Submit Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizGenerator;
