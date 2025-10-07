import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Fake login validation
    if (email && password) {
      localStorage.setItem("user", JSON.stringify({ email }));
      navigate("/"); // redirect to home
    } else {
      alert("Please enter valid credentials");
    }
  };

  return (
    <div
      className="min-h-screen bg-no-repeat bg-center bg-cover flex items-center justify-center"
      style={{
        backgroundImage:
          "url('/pencils-with-blackboard-education-pkigpokm90rnp5ua.jpg')",
      }}
    >
      <div className="bg-white bg-opacity-90 p-10 rounded-xl shadow-lg max-w-md w-full mx-4">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Login
        </h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-md transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-gray-700">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
