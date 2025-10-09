// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserCircleIcon } from "@heroicons/react/24/solid";

const Login = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email.trim() === "") return alert("Enter your email");
    navigate("/home", { state: { email } });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-indigo-500 to-blue-600">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-96 text-center animate-fadeInUp">
        <UserCircleIcon className="w-16 h-16 mx-auto text-blue-600 mb-4" />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back 👋</h2>
        <p className="text-gray-500 mb-6">Login with your email to continue</p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-500">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/")}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Go Back
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;


