// src/components/Dashboard.jsx
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = ({ data }) => {
  if (!data || data.length === 0)
    return (
      <div className="p-6 text-center text-gray-500">
        No quiz attempts yet. Take a quiz to see your progress!
      </div>
    );

  // Calculate summary
  const totalQuizzes = data.length;
  const avgScore =
    data.reduce((acc, item) => acc + item.score, 0) /
    (data.reduce((acc, item) => acc + item.total, 0) || 1) *
    100;

  const areasToImprove = data
    .filter((d) => d.score / d.total < 0.7)
    .map((d) => d.chapter);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-xl mt-6 space-y-6">
      <h2 className="text-2xl font-semibold text-blue-600 mb-6 text-center">
        Your Progress Dashboard
      </h2>

      {/* Bar Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="chapter" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="score" fill="#2563eb" radius={[5, 5, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      {/* Summary */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
        <h3 className="text-xl font-semibold mb-2">Quiz Summary</h3>
        <ul className="list-disc pl-5 space-y-1 text-gray-700">
          <li>Total Quizzes Completed: {totalQuizzes}</li>
          <li>Average Score: {avgScore.toFixed(2)}%</li>
          <li>
            Areas to Improve:{" "}
            {areasToImprove.length > 0 ? areasToImprove.join(", ") : "None"}
          </li>
        </ul>
      </div>

      {/* Detailed Scores */}
      <div className="mt-4 space-y-2">
        {data.map((d, i) => (
          <p key={i} className="text-gray-700">
            <b>{d.chapter}</b>: {d.score} / {d.total} points
          </p>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
