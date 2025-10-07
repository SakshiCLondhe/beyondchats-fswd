// src/components/PdfUploader.jsx
import React, { useState } from "react";
import axios from "axios";

const PdfUploader = ({ onUpload }) => {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return alert("Select a PDF first!");
    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const res = await axios.post("http://localhost:5000/api/upload", formData);
      onUpload(res.data.pdfName);
      alert("PDF uploaded successfully ✅");
    } catch (err) {
      console.error(err);
      alert("Upload failed ❌");
    }
  };

  return (
    <div className="p-6 border-2 border-blue-300 rounded-xl shadow-md bg-white max-w-md mx-auto mt-6">
      <h2 className="text-xl font-semibold text-blue-600 mb-4 text-center">Upload Your PDF</h2>
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
        className="block w-full text-sm text-gray-700 mb-4"
      />
      <button
        onClick={handleUpload}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
      >
        Upload PDF
      </button>
    </div>
  );
};

export default PdfUploader;
