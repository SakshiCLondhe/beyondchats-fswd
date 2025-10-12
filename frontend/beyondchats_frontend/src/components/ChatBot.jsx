import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  // Scroll to bottom on message update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message to backend
  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    try {
      const res = await axios.post(`${API_URL}/api/chat`, { message: input });
      setMessages([...newMessages, { text: res.data.reply, sender: "bot" }]);
    } catch (err) {
      console.error(err);
      setMessages([
        ...newMessages,
        { text: "Error: Could not get response", sender: "bot" },
      ]);
    }
  };

  return (
    <div className="flex flex-col h-[70vh] w-full max-w-3xl bg-white rounded-2xl shadow-xl border overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-6 py-4 font-semibold rounded-t-2xl">
        BeyondChats AI Assistant
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] px-4 py-2 rounded-2xl break-words ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-gray-200 text-gray-800 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="flex p-4 border-t bg-gray-100">
        <input
          type="text"
          placeholder="Type your question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 px-4 py-2 rounded-l-2xl border focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <button
          onClick={sendMessage}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-r-2xl font-semibold transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
