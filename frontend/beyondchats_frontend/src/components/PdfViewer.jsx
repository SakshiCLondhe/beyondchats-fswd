// src/components/PdfViewer.jsx
import React from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfViewer = ({ pdfUrl }) => {
  if (!pdfUrl) {
    return (
      <p className="text-center text-gray-500 mt-4 font-medium">
        No PDF selected. Please upload a file to preview.
      </p>
    );
  }

  return (
    <div className="flex justify-center mt-6">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl shadow-2xl p-6 w-full max-w-4xl border border-gray-200 overflow-auto">
        <h2 className="text-3xl font-bold text-blue-600 mb-4 text-center drop-shadow-md">
          PDF Preview 📄
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Read your uploaded NCERT PDF here. Scroll down to see more pages.
        </p>
        <div className="flex flex-col items-center gap-6">
          <Document file={pdfUrl}>
            <Page pageNumber={1} width={600} className="rounded-xl shadow-md" />
          </Document>
          {/* Optional: Show more pages */}
          {/* <Document file={pdfUrl}>
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} width={600} className="rounded-xl shadow-md" />
            ))}
          </Document> */}
        </div>
      </div>
    </div>
  );
};

export default PdfViewer;
