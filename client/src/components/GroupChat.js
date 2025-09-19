// src/pages/GroupChat.js
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

function GroupChat() {
  const [messages, setMessages] = useState([
    { text: "Welcome to the community chat!", sender: "system", time: "09:00 AM" },
    { text: "Hi everyone!", sender: "Alice", time: "09:01 AM" },
    { text: "Hello Alice!", sender: "Bob", time: "09:02 AM" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const usersColors = {
    Alice: "bg-blue-100 text-blue-800",
    Bob: "bg-green-100 text-green-800",
    system: "bg-gray-200 text-gray-800",
    You: "bg-purple-100 text-purple-800",
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages([...messages, { text: input, sender: "You", time }]);
    setInput("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto p-4 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Group Chat
      </h2>

      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4 rounded-xl shadow-inner space-y-3 bg-white">
        {messages.map((msg, i) => {
          const isYou = msg.sender === "You";
          const colorClass = usersColors[msg.sender] || "bg-yellow-100 text-yellow-800";
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`max-w-xs break-words p-3 rounded-xl ${colorClass} ${
                isYou ? "ml-auto text-right" : "mr-auto text-left"
              }`}
            >
              {msg.sender !== "system" && (
                <div className="text-xs font-semibold mb-1">{msg.sender}</div>
              )}
              <div>{msg.text}</div>
              <div className="text-xs text-gray-500 mt-1">{msg.time}</div>
            </motion.div>
          );
        })}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Input box */}
      <div className="mt-4 flex items-center space-x-2">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={sendMessage}
          className="p-3 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-md hover:bg-blue-600"
        >
          <Send className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}

export default GroupChat;
