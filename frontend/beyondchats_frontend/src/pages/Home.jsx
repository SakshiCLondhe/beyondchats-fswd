// src/pages/Home.jsx
import React from "react";

const Home = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/1000_F_595278130_pm019aWdqNojWHZsWiUcPi3sthitC1Gk.jpg')" }}
    >
      <div className="bg-white bg-opacity-80 p-10 rounded-xl shadow-lg text-center max-w-lg mx-4">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">
          Welcome to BeyondChats
        </h1>
        <p className="text-gray-700 mb-6">
          Upload your PDFs, generate quizzes, and track your learning progress easily.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md transition duration-300">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;



