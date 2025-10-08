import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";

// Pages & Components
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import QuizPage from "./pages/QuizPage";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";

// Backend URL
import { API_URL } from "./config";

function App() {
  // Store user as an object, parsed from localStorage
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // Listen for login/logout changes in other tabs
  useEffect(() => {
    const handleStorageChange = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Optional: test backend connectivity
  useEffect(() => {
    axios
      .get(`${API_URL}/api/users`)
      .then((res) => console.log("Users:", res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar receives user */}
      {user && <Navbar user={user} />}

      <Routes>
        {/* Public Routes */}
        {!user && (
          <>
            <Route path="/login" element={<LoginPage setUser={setUser} />} />
            <Route
              path="/register"
              element={<Register setUser={setUser} />}
            />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )}

        {/* Private Routes */}
        {user && (
          <>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/quiz" element={<QuizPage user={user} />} />
            <Route path="/dashboard" element={<DashboardPage user={user} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
