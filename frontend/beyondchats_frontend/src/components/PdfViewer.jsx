// src/components/PdfViewer.jsx
import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfViewer = ({ pdfFile }) => {
  const [numPages, setNumPages] = useState(null);

  if (!pdfFile) return null;

  return (
    <div className="p-6 bg-white shadow-md rounded-xl max-w-3xl mx-auto mt-6">
      <Document
        file={pdfFile}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page
            key={index + 1}
            pageNumber={index + 1}
            className="mb-4 shadow-sm border rounded"
            width={700}
          />
        ))}
      </Document>
    </div>
  );
};

export default PdfViewer;
