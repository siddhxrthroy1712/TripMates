import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function InboxPage() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Mock chats data
  const mockChats = [
    {
      id: 1,
      riderName: "John Doe",
      lastMessage: "See you at the pickup point!",
      timestamp: "2024-02-20T10:30:00",
      rideDate: "2024-02-21",
      unread: true,
      avatar: "👤",
    },
    {
      id: 2,
      riderName: "Jane Smith",
      lastMessage: "Thanks for the ride!",
      timestamp: "2024-02-19T15:45:00",
      rideDate: "2024-02-19",
      unread: false,
      avatar: "👤",
    },
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Hamburger and Logo */}
      <header className="bg-white shadow relative">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Left side - Hamburger for desktop, Back button for mobile */}
            <div className="flex items-center relative">
              {/* Mobile Back Button */}
              <button
                onClick={() => navigate(-1)}
                className="md:hidden p-1 hover:bg-gray-100 rounded-full cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              {/* Desktop Hamburger */}
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="hidden md:block p-1 hover:bg-gray-100 rounded-full cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>

                {/* Desktop Menu Dropdown */}
                {isMenuOpen && (
                  <div className="hidden md:block absolute left-0 top-full mt-2 w-64 bg-white shadow-lg rounded-lg py-2 z-50">
                    <button
                      onClick={() => {
                        navigate("/booking-history");
                        setIsMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 cursor-pointer flex items-center space-x-3"
                    >
                      <span className="text-xl">🚗</span>
                      <span>Your rides</span>
                    </button>
                    <button
                      onClick={() => {
                        navigate("/search-destination");
                        setIsMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 cursor-pointer flex items-center space-x-3"
                    >
                      <span className="text-xl">🔍</span>
                      <span>Search</span>
                    </button>
                    <button
                      onClick={() => {
                        navigate("/publish");
                        setIsMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 cursor-pointer flex items-center space-x-3"
                    >
                      <span className="text-xl">➕</span>
                      <span>Publish</span>
                    </button>
                    <button
                      onClick={() => {
                        navigate("/inbox");
                        setIsMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 cursor-pointer flex items-center space-x-3 bg-gray-100"
                    >
                      <span className="text-xl">💬</span>
                      <span>Inbox</span>
                    </button>
                    <button
                      onClick={() => {
                        navigate("/profile");
                        setIsMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 cursor-pointer flex items-center space-x-3"
                    >
                      <span className="text-xl">👤</span>
                      <span>Profile</span>
                    </button>
                  </div>
                )}
              </div>

              <h1 className="text-2xl font-semibold text-gray-900 ml-4">
                Inbox
              </h1>
            </div>

            {/* Right side - Logo */}
            <div className="hidden md:block">
              <img
                src="./src/assets/logo.png"
                alt="UniGo Logo"
                className="h-20  w-auto cursor-pointer"
                onClick={() => navigate("/")}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Chat List */}
      <div className="max-w-6xl mx-auto px-4 py-6 mb-20">
        {mockChats.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">No messages yet</p>
          </div>
        ) : (
          <div className="space-y-2">
            {mockChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => navigate(`/chat/${chat.id}`)}
                className="bg-white rounded-lg shadow p-4 cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">{chat.avatar}</div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {chat.riderName}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Ride on {formatDate(chat.rideDate)}
                        </p>
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatTime(chat.timestamp)}
                      </div>
                    </div>
                    <div className="mt-1 flex justify-between items-center">
                      <p className="text-sm text-gray-600 truncate max-w-[70%]">
                        {chat.lastMessage}
                      </p>
                      {chat.unread && (
                        <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                          New
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      <nav className="w-full bg-gray-50 fixed bottom-0 md:hidden z-50">
        <div className="flex justify-around items-center p-3">
          <button
            onClick={() => navigate("/booking-history")}
            className="flex flex-col cursor-pointer items-center space-y-1"
          >
            <span className="text-xl">🚗</span>
            <span className="text-xs text-gray-600">Your rides</span>
          </button>
          <button
            onClick={() => navigate("/search-destination")}
            className="flex flex-col cursor-pointer items-center space-y-1"
          >
            <span className="text-xl">🔍</span>
            <span className="text-xs text-gray-600">Search</span>
          </button>
          <button
            onClick={() => navigate("/publish")}
            className="flex flex-col cursor-pointer items-center space-y-1"
          >
            <span className="text-xl">➕</span>
            <span className="text-xs text-gray-600">Publish</span>
          </button>
          <button
            onClick={() => navigate("/inbox")}
            className="flex flex-col cursor-pointer items-center space-y-1"
          >
            <span className="text-xl">💬</span>
            <span className="text-xs text-gray-600">Inbox</span>
          </button>
          <button
            onClick={() => navigate("/profile")}
            className="flex flex-col cursor-pointer items-center space-y-1"
          >
            <span className="text-xl">👤</span>
            <span className="text-xs text-gray-600">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default InboxPage;
