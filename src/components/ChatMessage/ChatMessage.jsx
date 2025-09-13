import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaLessThan, FaPaperPlane } from "react-icons/fa";
import { IoWarning } from "react-icons/io5";

const ChatMessage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { type: "passenger", text: "Hy Please come before 5PM - Thanks" },
    { type: "passenger", text: "Passenger Message" },
    { type: "driver", text: "Driver Message" },
    { type: "passenger", text: "Passenger Message" },
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setMessages([...messages, { type: "passenger", text: message }]);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#412160] text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-purple-700 rounded-full transition-all"
            >
              <FaLessThan className="text-xl" />
            </button>
            <div>
              <h1 className="text-lg font-medium">Karachi to Hyderabad</h1>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p className="text-sm">Online</p>
              </div>
            </div>
          </div>
          <div className="text-sm">Today, 1 Passenger</div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.type === "passenger" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-2xl p-3 ${
                msg.type === "passenger"
                  ? "bg-[#E9D8FD] text-black"
                  : "bg-gray-200 text-black"
              }`}
            >
              <p>{msg.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Warning Message */}
      <div className="bg-red-50 border-t border-red-100 px-4 py-2">
        <div className="flex items-center gap-2 text-red-600">
          <IoWarning className="text-lg flex-shrink-0" />
          <p className="text-sm">
            Only pay driver in cash in the car and scooty
          </p>
        </div>
      </div>

      {/* Message Input */}
      <div className="border-t bg-white p-4">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type Your Message Here..."
            className="flex-1 p-3 rounded-full border border-gray-300 focus:outline-none focus:border-purple-500"
          />
          <button
            type="submit"
            className="p-3 bg-[#412160] text-white rounded-full hover:bg-purple-700 transition-colors"
          >
            <FaPaperPlane />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatMessage;
