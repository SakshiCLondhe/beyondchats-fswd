import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config";
import VideoPage from "./VideoPage";
import PdfViewer from "../components/PdfViewer";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [pdfs, setPdfs] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [quiz, setQuiz] = useState([]);

  // Fetch PDFs and generate quiz for the first PDF
  const handleGetStarted = async () => {
    setLoading(true);
    try {
      // 1️⃣ Fetch all PDFs
      const pdfRes = await axios.get(`${API_URL}/api/pdfs`);
      setPdfs(pdfRes.data);

      if (pdfRes.data.length > 0) {
        const firstPdf = pdfRes.data[0];
        setSelectedPdf(firstPdf);

        // 2️⃣ Generate quiz for first PDF
        const quizRes = await axios.post(`${API_URL}/api/quizzes/generate`, {
          pdfId: firstPdf._id,
        });
        setQuiz(quizRes.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle user selecting a different PDF
  const handlePdfSelect = async (pdf) => {
    setSelectedPdf(pdf);
    try {
      const quizRes = await axios.post(`${API_URL}/api/quizzes/generate`, { pdfId: pdf._id });
      setQuiz(quizRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-blue-700 mb-2">Welcome to BeyondChats</h1>
        <button
          onClick={handleGetStarted}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md"
        >
          {loading ? "Loading..." : "Get Started"}
        </button>
      </div>

      {/* PDF Selector */}
      {pdfs.length > 0 && (
        <div className="mb-6 max-w-xl mx-auto">
          <h2 className="text-2xl font-bold mb-2">Select PDF:</h2>
          <ul className="list-disc list-inside flex flex-wrap gap-2">
            {pdfs.map((pdf) => (
              <li key={pdf._id}>
                <button
                  onClick={() => handlePdfSelect(pdf)}
                  className={`px-3 py-1 rounded ${
                    selectedPdf?._id === pdf._id ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                >
                  {pdf.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* PDF Viewer */}
      {selectedPdf && (
        <div className="mb-6 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-2">PDF Preview: {selectedPdf.name}</h2>
          <PdfViewer pdfUrl={`${API_URL}/uploads/${selectedPdf.fileName}`} />
        </div>
      )}

      {/* Quiz Display */}
      {quiz.length > 0 && (
        <div className="mb-6 max-w-4xl mx-auto bg-white p-4 rounded shadow">
          <h2 className="text-2xl font-bold mb-2">Quiz Questions:</h2>
          <ol className="list-decimal list-inside">
            {quiz.map((q, idx) => (
              <li key={idx}>{q.question}</li>
            ))}
          </ol>
        </div>
      )}

      {/* Video Recommendations */}
      {selectedPdf && <VideoPage topic={selectedPdf.name} />}
    </div>
  );
};

export default Home;
