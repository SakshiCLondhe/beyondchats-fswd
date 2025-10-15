import React, { useState } from "react";

const ChatBot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { role: "user", text: input }]);
    const userMessage = input;
    setInput("");

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await res.json();

      // Add bot reply
      setMessages((prev) => [...prev, { role: "bot", text: data.reply }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Something went wrong. Try again." },
      ]);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-center">ChatBot 🤖</h2>
      <div className="mb-4 h-64 overflow-y-auto border p-2 rounded">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`mb-2 p-2 rounded ${
              m.role === "user" ? "bg-blue-100 text-right" : "bg-gray-100 text-left"
            }`}
          >
            {m.text}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border rounded-l outline-none"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-red-600 text-white px-4 rounded-r hover:bg-red-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
