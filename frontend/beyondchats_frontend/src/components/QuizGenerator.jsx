// src/components/QuizGenerator.jsx
import React, { useState } from "react";
import axios from "axios";

const QuizGenerator = ({ pdfName }) => {
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  const generateQuiz = async () => {
    if (!pdfName) return alert("Upload a PDF first!");
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/quiz", { pdfName });
      setQuiz(res.data);
      setScore(null); // reset previous score
      setAnswers({});
    } catch (err) {
      console.error(err);
      alert("Quiz generation failed ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (qIndex, value) => {
    setAnswers({ ...answers, [qIndex]: value });
  };

  const handleSubmit = () => {
    let tempScore = 0;
    quiz.forEach((q, i) => {
      if (q.correct_answer) {
        if (answers[i] && answers[i].trim().toLowerCase() === q.correct_answer.trim().toLowerCase()) {
          tempScore += 1;
        }
      }
    });
    setScore(tempScore);
    alert(`You scored ${tempScore} out of ${quiz.length}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-xl mt-6">
      <h2 className="text-2xl font-semibold text-blue-600 mb-4 text-center">
        Quiz Generator
      </h2>

      <div className="flex justify-center mb-6">
        <button
          onClick={generateQuiz}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition"
        >
          {loading ? "Generating..." : "Generate Quiz"}
        </button>
      </div>

      {quiz.length > 0 && (
        <>
          <div className="space-y-6">
            {quiz.map((q, i) => (
              <div key={i} className="p-4 border rounded-lg shadow-sm bg-gray-50">
                <p className="font-semibold mb-2">
                  Q{i + 1}: {q.question}
                </p>

                {q.options ? (
                  <div className="space-y-2">
                    {q.options.map((opt, j) => (
                      <label key={j} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name={`q${i}`}
                          value={opt}
                          checked={answers[i] === opt}
                          onChange={() => handleChange(i, opt)}
                          className="accent-blue-600"
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <textarea
                    placeholder="Type your answer..."
                    value={answers[i] || ""}
                    onChange={(e) => handleChange(i, e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                )}

                {score !== null && (
                  <p className="mt-2 text-sm">
                    <b>Correct Answer:</b> {q.correct_answer} <br />
                    {q.explanation && (
                      <span className="text-gray-600">
                        <b>Explanation:</b> {q.explanation}
                      </span>
                    )}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded transition"
            >
              Submit Quiz
            </button>
          </div>

          {score !== null && (
            <p className="text-center mt-4 text-xl font-bold text-blue-600">
              Your Score: {score} / {quiz.length}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default QuizGenerator;
