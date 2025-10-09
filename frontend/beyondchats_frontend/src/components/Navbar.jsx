// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("storage")); // Sync logout across tabs
    navigate("/login");
  };

  return (
    <nav className="bg-blue-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <h1
          className="text-2xl font-extrabold cursor-pointer tracking-wide"
          onClick={() => navigate("/home")}
        >
          BeyondChats
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/home" className="hover:text-gray-200 transition">Home</Link>
          <Link to="/quiz" className="hover:text-gray-200 transition">Quiz</Link>
          <Link to="/dashboard" className="hover:text-gray-200 transition">Dashboard</Link>

          <div className="flex items-center gap-3 ml-6">
            <span className="font-semibold text-sm bg-white text-blue-700 px-3 py-1 rounded-full">
              {user?.user?.name || "User"}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col gap-1 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-blue-600 px-4 py-3 space-y-3 text-center">
          <Link
            to="/home"
            className="block text-white hover:text-gray-200"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/quiz"
            className="block text-white hover:text-gray-200"
            onClick={() => setIsOpen(false)}
          >
            Quiz
          </Link>
          <Link
            to="/dashboard"
            className="block text-white hover:text-gray-200"
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>

          <div className="mt-2 border-t border-blue-400 pt-3">
            <p className="text-sm text-blue-100 mb-2">{user?.user?.name}</p>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 w-full py-2 rounded-lg text-white transition"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
