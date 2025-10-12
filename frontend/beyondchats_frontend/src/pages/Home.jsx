import React, { useState } from "react";
import YouTubeRecommender from "../components/YouTubeRecommender";
import PdfViewer from "../components/PdfViewer";
import QuizGenerator from "../components/QuizGenerator";
import ChatBot from "../components/ChatBot";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [activeSection, setActiveSection] = useState("youtube");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [uploadedPdf, setUploadedPdf] = useState(null);
  const navigate = useNavigate();

  const menu = [
    { key: "profile", label: "Profile" },
    { key: "youtube", label: "YouTube" },
    { key: "pdf", label: "PDF Viewer" },
    { key: "quiz", label: "Quiz" },
    { key: "chatbot", label: "Chatbot" },
    { key: "search", label: "Search" },
    { key: "contact", label: "Contact Us" },
    { key: "help", label: "Help" },
  ];

  const handlePdfUpload = (e) => {
    const file = e.target.files[0];
    if (file) setUploadedPdf(URL.createObjectURL(file));
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };

  // ✅ Sidebar constant
  const Sidebar = (
    <aside
      className={`fixed top-0 left-0 z-50 h-screen w-64 bg-white shadow-lg p-5 flex flex-col overflow-y-auto transform transition-transform duration-300
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0 sm:relative`}
    >
      {/* User Info */}
      <div className="flex flex-col items-center bg-gradient-to-r from-blue-100 to-blue-200 p-4 rounded-xl shadow mb-6 mt-16 sm:mt-0">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-indigo-600 font-bold text-2xl shadow">
          S
        </div>
        <h3 className="mt-3 text-lg font-semibold text-indigo-700">
          Sakshi Londhe
        </h3>
        <p className="text-sm text-gray-600">Student | BeyondChats</p>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 space-y-3">
        {menu.map((item) => (
          <button
            key={item.key}
            className={`w-full text-left px-3 py-2 rounded-md font-medium transition-all duration-200 ${
              activeSection === item.key
                ? "bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md"
                : "hover:bg-gradient-to-r hover:from-blue-300 hover:to-blue-500 hover:text-white"
            }`}
            onClick={() => {
              setActiveSection(item.key);
              setSidebarOpen(false); // close sidebar on mobile
            }}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800 overflow-y-auto">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex justify-between items-center px-6 py-3 shadow-lg">
        <h1 className="text-2xl font-extrabold tracking-wide">
          Welcome, BeyondChats
        </h1>

        {/* Desktop Buttons */}
        <div className="hidden sm:flex items-center space-x-4 text-lg font-medium">
          <button className="hover:text-yellow-200 transition">Search</button>
          <button className="hover:text-yellow-200 transition">Contact Us</button>
          <button className="hover:text-yellow-200 transition">Help</button>
          <button
            onClick={handleLogout}
            className="px-3 py-2 bg-red-500 hover:bg-red-600 rounded-md font-semibold shadow text-white"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu & Logout */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            className="px-3 py-2 bg-red-500 hover:bg-red-600 rounded-md font-semibold shadow text-white"
            onClick={handleLogout}
          >
            Logout
          </button>
          <button
            className="px-3 py-2 bg-white text-blue-600 font-semibold rounded shadow"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            Menu
          </button>
        </div>
      </header>

      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        {Sidebar}

        {/* Main Content */}
        <main className="flex-1 flex justify-center items-center p-6 sm:p-8 ml-0 sm:ml-64 overflow-hidden">
          <div className="w-full max-w-5xl">
            {activeSection === "profile" && (
              <div className="flex flex-col justify-center items-center bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-3xl font-bold mb-6 text-indigo-600 text-center">
                  Your Profile
                </h2>
                <p>Name: Sakshi Londhe</p>
                <p>Role: Student</p>
                <p>Email: sakshi@example.com</p>
              </div>
            )}

            {activeSection === "youtube" && (
              <div className="flex justify-center">
                <YouTubeRecommender query="NCERT Science Class 10" />
              </div>
            )}

            {activeSection === "pdf" && (
              <div className="flex justify-center mt-6">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-3xl shadow-2xl border border-gray-200 flex flex-col gap-6 w-full max-w-4xl">
                  <h2 className="text-3xl font-bold text-blue-600 mb-2 text-center drop-shadow-md">
                    Upload & Read NCERT PDF 📄
                  </h2>
                  <p className="text-center text-gray-600 mb-4">
                    Upload any NCERT PDF to read and preview it below.
                  </p>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handlePdfUpload}
                    className="p-3 border-2 border-blue-300 rounded-lg cursor-pointer hover:border-blue-500 transition"
                  />
                  {uploadedPdf && <PdfViewer pdfUrl={uploadedPdf} />}
                </div>
              </div>
            )}

            {activeSection === "quiz" && (
              <div className="flex justify-center">
                <QuizGenerator pdfUrl={uploadedPdf} />
              </div>
            )}

            {activeSection === "chatbot" && (
              <div className="flex justify-center">
                <ChatBot />
              </div>
            )}

            {activeSection === "search" && (
              <div className="flex justify-center items-center h-full">
                <h2 className="text-2xl font-bold text-indigo-600">
                  Search Coming Soon 🔍
                </h2>
              </div>
            )}

            {activeSection === "contact" && (
              <div className="flex justify-center items-center h-full">
                <h2 className="text-2xl font-bold text-indigo-600">
                  Contact Us Page 📞
                </h2>
              </div>
            )}

            {activeSection === "help" && (
              <div className="flex justify-center items-center h-full">
                <h2 className="text-2xl font-bold text-indigo-600">
                  Help & Support 💬
                </h2>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
