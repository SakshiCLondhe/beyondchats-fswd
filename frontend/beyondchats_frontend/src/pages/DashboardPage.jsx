// src/pages/DashboardPage.jsx
import React, { useState, useEffect } from "react";
import Dashboard from "../components/Dashboard";
import axios from "axios";

const DashboardPage = () => {
  const [progressData, setProgressData] = useState([]);

  useEffect(() => {
    // Fetch progress from backend
    const fetchProgress = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/user/progress");
        setProgressData(res.data);
      } catch (err) {
        console.error(err);
        // Dummy data fallback
        setProgressData([
          { chapter: "Chapter 1", score: 7, total: 10 },
          { chapter: "Chapter 2", score: 5, total: 10 },
          { chapter: "Chapter 3", score: 8, total: 10 },
        ]);
      }
    };
    fetchProgress();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">
        Progress Dashboard
      </h1>
      <Dashboard data={progressData} />
    </div>
  );
};

export default DashboardPage;
