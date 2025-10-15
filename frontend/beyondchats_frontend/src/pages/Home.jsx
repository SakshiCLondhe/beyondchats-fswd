import React, { useState } from "react";
import { Search, HelpCircle, Phone, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import YouTubeRecommender from "../components/YouTubeRecommender";
import PdfViewer from "../components/PdfViewer";
import QuizGenerator from "../components/QuizGenerator";
import ChatBot from "../components/ChatBot";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [uploadedPdf, setUploadedPdf] = useState(null);
  const navigate = useNavigate();

  const menu = [
    { key: "profile", label: "Profile" },
    { key: "youtube", label: "YouTube" },
    { key: "pdf", label: "PDF Viewer" },
    { key: "quiz", label: "Quiz" },
    { key: "chatbot", label: "Chatbot" },
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

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800 overflow-x-hidden">
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex justify-between items-center px-4 sm:px-6 py-3 shadow-lg">
        <h1 className="text-lg sm:text-2xl font-extrabold tracking-wide truncate">
          Welcome, BeyondChats
        </h1>

        <div className="flex items-center gap-2 sm:gap-4">
          <button className="p-2 hover:bg-blue-700 rounded-full">
            <Search size={20} className="sm:w-6 sm:h-6" />
          </button>
          <button className="p-2 hover:bg-blue-700 rounded-full">
            <HelpCircle size={20} className="sm:w-6 sm:h-6" />
          </button>
          <button className="p-2 hover:bg-blue-700 rounded-full">
            <Phone size={20} className="sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={() => setSidebarOpen(true)}
            className="hidden sm:block px-3 py-2 bg-white text-blue-600 font-semibold rounded shadow hover:bg-blue-100"
          >
            Menu
          </button>
          <button
            onClick={handleLogout}
            className="px-2 sm:px-3 py-2 bg-red-500 hover:bg-red-600 rounded-md font-semibold shadow text-white text-sm sm:text-base"
          >
            Logout
          </button>
          {/* Hamburger for Mobile */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="block sm:hidden p-2 bg-white text-blue-600 rounded-md shadow"
          >
            ☰
          </button>
        </div>
      </header>

      {/* SIDEBAR (Responsive + Animated) */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed top-0 left-0 h-full w-64 sm:w-72 bg-white shadow-2xl p-5 z-50 overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 text-gray-700"
            >
              <X size={24} />
            </button>

            {/* User Info */}
            <div className="flex flex-col items-center mt-10 bg-gradient-to-r from-blue-100 to-blue-200 p-4 rounded-xl shadow">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center text-indigo-600 font-bold text-xl sm:text-2xl shadow">
                S
              </div>
              <h3 className="mt-3 text-base sm:text-lg font-semibold text-indigo-700">
                Sakshi Londhe
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                Student | BeyondChats
              </p>
            </div>

            {/* Menu Items */}
            <nav className="mt-8 space-y-2 sm:space-y-3">
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
                    setSidebarOpen(false);
                  }}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex justify-center items-center p-4 sm:p-8 pt-24">
        <div className="w-full max-w-6xl">
          {/* HOME SECTION */}
          {activeSection === "home" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="bg-white rounded-3xl shadow-lg p-6 sm:p-10 text-center"
            >
              <h2 className="text-2xl sm:text-4xl font-bold text-blue-700 mb-4 sm:mb-6">
                Welcome to <span className="text-indigo-600">BeyondChats</span>
              </h2>
              <marquee
                behavior="scroll"
                direction="left"
                scrollamount="5"
                className="text-base sm:text-xl text-gray-700 font-semibold"
              >
                💬 Learn, Explore, and Interact Smarter with BeyondChats — Your
                Personal Study and AI Assistant!
              </marquee>
              <p className="mt-4 sm:mt-6 text-gray-600 text-base sm:text-lg leading-relaxed">
                Use the <span className="font-semibold text-blue-600">Menu</span> button on the
                top right to explore features like YouTube Recommender, PDF Reader,
                Quiz Generator, and Chatbot.
              </p>
            </motion.div>
          )}

          {/* PROFILE SECTION */}
          {activeSection === "profile" && (
            <div className="flex flex-col justify-center items-center bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-indigo-600 text-center">
                Your Profile
              </h2>
              <p className="text-sm sm:text-base">Name: Sakshi Londhe</p>
              <p className="text-sm sm:text-base">Role: Student</p>
              <p className="text-sm sm:text-base">Email: sakshi@example.com</p>
            </div>
          )}

          {/* YOUTUBE SECTION */}
          {activeSection === "youtube" && (
            <div className="flex flex-col items-center">
              <YouTubeRecommender query="NCERT Science Class 10" />
            </div>
          )}

          {/* PDF SECTION */}
          {activeSection === "pdf" && (
            <div className="flex flex-col items-center mt-4 sm:mt-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 sm:p-6 rounded-3xl shadow-2xl border border-gray-200 flex flex-col gap-4 sm:gap-6 w-full max-w-4xl">
                <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2 text-center drop-shadow-md">
                  Upload & Read NCERT PDF 📄
                </h2>
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

          {/* QUIZ SECTION */}
          {activeSection === "quiz" && (
            <div className="flex justify-center items-center">
              <QuizGenerator pdfUrl={uploadedPdf} />
            </div>
          )}

          {/* CHATBOT SECTION */}
          {activeSection === "chatbot" && (
            <div className="flex justify-center items-center">
              <ChatBot />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
