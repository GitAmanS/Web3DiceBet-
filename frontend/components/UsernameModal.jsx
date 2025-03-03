"use client";
import { useState, useEffect } from "react";

export default function UsernameModal({ setUsername }) {
  const [input, setInput] = useState("");

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) setUsername(savedUsername);
  }, []);

  const handleSave = () => {
    if (!input.trim()) return alert("Please enter a username.");
    localStorage.setItem("username", input.trim());
    setUsername(input.trim());
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white">
        <h2 className="text-lg font-bold mb-4">Enter Your Username</h2>
        <input
          type="text"
          className="w-full p-2 bg-gray-700 rounded-lg text-white mb-4"
          placeholder="e.g., Player123"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="w-full bg-blue-600 py-2 rounded-lg"
          onClick={handleSave}
        >
          Start Game
        </button>
      </div>
    </div>
  );
}
