import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../config";

const GetStartedButton = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleGetStarted = async () => {
    setLoading(true);
    setMessage("");

    try {
      // Example API call to backend
      const res = await axios.get(`${API_URL}/api/users`);
      setMessage(`Backend responded with ${res.data.length} users.`);
      console.log("Users:", res.data);
    } catch (err) {
      console.error("API call failed:", err);
      setMessage("Failed to connect to backend. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center mt-6">
      <button
        onClick={handleGetStarted}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded shadow transition"
        disabled={loading}
      >
        {loading ? "Loading..." : "Get Started"}
      </button>
      {message && <p className="mt-4 text-gray-700">{message}</p>}
    </div>
  );
};

export default GetStartedButton;
