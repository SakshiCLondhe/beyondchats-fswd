// src/pages/Home.jsx
import React, { useState } from "react";
import { UserCircle2, LogOut, BookOpen, FileText, Brain } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import Dashboard from "../components/Dashboard";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Home = () => {
  const [active, setActive] = useState("dashboard");
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const email = localStorage.getItem("email") || "Guest";

  const quizData = [
    { chapter: "Chapter 1", score: 8, total: 10 },
    { chapter: "Chapter 2", score: 7, total: 10 },
    { chapter: "Chapter 3", score: 6, total: 10 },
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedPdf(URL.createObjectURL(file));
      setFileUploaded(true);

      // Simulate generating questions from PDF
      setQuizQuestions([
        "What is the primary focus of Physics?",
        "Define force.",
        "Give an example of energy in daily life.",
      ]);
    } else {
      alert("Please upload a valid PDF file!");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-700 text-white flex flex-col p-6 space-y-6">
        <h1 className="text-2xl font-bold mb-4">BeyondChats</h1>

        <div className="flex items-center space-x-3 bg-blue-600 p-3 rounded-lg">
          <UserCircle2 className="w-8 h-8 text-white" />
          <div className="text-sm">
            <p className="font-semibold">{email}</p>
            <p className="opacity-80 text-xs">Online</p>
          </div>
        </div>

        <nav className="flex flex-col space-y-2 mt-6">
          <button
            onClick={() => setActive("dashboard")}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition ${
              active === "dashboard" ? "bg-blue-500" : "hover:bg-blue-600"
            }`}
          >
            <BookOpen className="w-5 h-5" /> Dashboard
          </button>
          <button
            onClick={() => setActive("quiz")}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition ${
              active === "quiz" ? "bg-blue-500" : "hover:bg-blue-600"
            }`}
          >
            <Brain className="w-5 h-5" /> Quiz
          </button>
          <button
            onClick={() => setActive("pdf")}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition ${
              active === "pdf" ? "bg-blue-500" : "hover:bg-blue-600"
            }`}
          >
            <FileText className="w-5 h-5" /> PDF
          </button>
        </nav>

        <div className="mt-auto">
          <button
            onClick={() => {
              localStorage.removeItem("email");
              window.location.href = "/";
            }}
            className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 w-full py-2 rounded-lg font-semibold"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8 overflow-auto">
        {/* Dashboard */}
        {active === "dashboard" && <Dashboard data={quizData} />}

        {/* Quiz */}
        {active === "quiz" && (
          <div>
            <h2 className="text-3xl font-bold mb-4 text-blue-700">Quiz Zone 🧠</h2>
            {quizQuestions.length === 0 ? (
              <p className="text-gray-600">Upload a PDF first to generate quiz questions.</p>
            ) : (
              <div className="space-y-4">
                {quizQuestions.map((q, i) => (
                  <div
                    key={i}
                    className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
                  >
                    <p className="font-semibold">{i + 1}. {q}</p>
                    <input
                      type="text"
                      placeholder="Your answer..."
                      className="mt-2 w-full border border-gray-300 rounded-lg p-2"
                    />
                  </div>
                ))}
                <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 font-semibold">
                  Submit Quiz
                </button>
              </div>
            )}
          </div>
        )}

        {/* PDF Viewer */}
        {active === "pdf" && (
          <div>
            <h2 className="text-3xl font-bold mb-4 text-blue-700">PDF Viewer 📄</h2>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileUpload}
              className="border border-gray-300 rounded-lg p-3 w-full bg-white shadow-sm mb-4"
            />
            {fileUploaded && (
              <>
                <p className="text-green-600 font-semibold mb-2">
                  PDF uploaded successfully!
                </p>
                <button
                  onClick={() => setActive("quiz")}
                  className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg font-semibold mb-4"
                >
                  Generate Quiz from this PDF
                </button>
                <div className="border border-gray-300 rounded-lg overflow-auto p-2 bg-white shadow">
                  <Document file={selectedPdf}>
                    <Page pageNumber={1} className="mx-auto shadow-md mb-4" />
                  </Document>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
