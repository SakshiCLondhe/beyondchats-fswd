// src/pages/QuizPage.jsx
import React, { useState } from "react";
import PdfUploader from "../components/PdfUploader";
import PdfViewer from "../components/PdfViewer";
import QuizGenerator from "../components/QuizGenerator";

const QuizPage = () => {
  const [uploadedPdf, setUploadedPdf] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">
        Generate Quizzes
      </h1>

      <PdfUploader onUpload={setUploadedPdf} />
      {uploadedPdf && (
        <>
          <PdfViewer pdfFile={uploadedPdf} />
          <QuizGenerator pdfName={uploadedPdf.name || uploadedPdf} />
        </>
      )}
    </div>
  );
};

export default QuizPage;

