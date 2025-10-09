// src/pages/LandingPage.jsx
import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex flex-col justify-center items-center overflow-hidden">
      {/* Decorative Background Shapes */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-lg mx-4 p-10 bg-white bg-opacity-90 rounded-3xl shadow-xl">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6 animate-fadeInDown">
          Welcome to <span className="text-blue-600">BeyondChats</span>
        </h1>
        <p className="text-gray-700 mb-8 text-lg animate-fadeIn">
          Upload your PDFs, generate quizzes, track your learning progress, and explore interactive study tools.
        </p>

        <div className="flex justify-center gap-6 animate-fadeInUp">
          {/* Navigation Links */}
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105 duration-300"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105 duration-300"
          >
            Register
          </Link>
        </div>

        <p className="mt-6 text-gray-500 text-sm animate-fadeIn">
          Designed for students, by students. Enhance your learning with AI-powered quizzes and study tools.
        </p>
      </div>

      {/* Tailwind Animation Styles */}
      <style>
        {`
          @keyframes blob {
            0%, 100% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 { animation-delay: 2s; }
          .animation-delay-4000 { animation-delay: 4s; }

          @keyframes fadeInDown {
            0% { opacity: 0; transform: translateY(-20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeInDown { animation: fadeInDown 1s ease-out forwards; }

          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeInUp { animation: fadeInUp 1s ease-out forwards; }

          @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
          .animate-fadeIn { animation: fadeIn 2s ease-out forwards; }
        `}
      </style>
    </div>
  );
};

export default LandingPage;
