import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfViewer = ({ pdfFile }) => {
  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => setNumPages(numPages);

  if (!pdfFile) return null;

  return (
    <div className="flex flex-col items-center gap-4 mt-6">
      <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (_, index) => (
          <Page
            key={index + 1}
            pageNumber={index + 1}
            width={600} // You can make this responsive
          />
        ))}
      </Document>
    </div>
  );
};

export default PdfViewer;
                                                                                