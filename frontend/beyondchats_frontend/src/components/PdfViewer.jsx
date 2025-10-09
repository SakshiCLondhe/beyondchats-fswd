// src/components/PdfViewer.jsx
import React from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfViewer = ({ pdfUrl }) => {
  if (!pdfUrl) return <p>No PDF selected</p>;

  return (
    <div className="border rounded-lg overflow-hidden shadow-md">
      <Document file={pdfUrl}>
        <Page pageNumber={1} width={600} />
      </Document>
    </div>
  );
};

export default PdfViewer;
