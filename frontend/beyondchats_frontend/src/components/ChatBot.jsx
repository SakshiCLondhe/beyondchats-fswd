import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../config";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

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
      setMessages([...newMessages, { text: "Error: Could not get response", sender: "bot" }]);
    }
  };

  return (
    <div className="p-4 flex flex-col h-[70vh] border rounded">
      <div className="flex-1 overflow-y-auto mb-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-2 p-2 rounded ${msg.sender === "user" ? "bg-blue-200 self-end" : "bg-gray-200 self-start"}`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          className="flex-1 border p-2 rounded-l"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button className="bg-blue-500 text-white px-3 rounded-r" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
