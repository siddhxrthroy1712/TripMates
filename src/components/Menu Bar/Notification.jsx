import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLessThan } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { BiMessageDetail } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";

const Notification = () => {
  const navigate = useNavigate();

  // This would typically come from your backend/state management
  const [notifications] = useState([
    {
      id: 1,
      type: "ride",
      message: "Your ride is confirm",
      isNew: true,
      timestamp: new Date(),
      icon: <FaUserCircle className="text-3xl text-[#412160]" />,
      bgColor: "bg-green-100",
    },
    {
      id: 2,
      type: "message",
      message: "You have a new message",
      isNew: false,
      timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      icon: <BiMessageDetail className="text-2xl text-[#412160]" />,
      bgColor: "bg-gray-50",
    },
    {
      id: 3,
      type: "message",
      message: "You have a new message",
      isNew: false,
      timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
      icon: <BiMessageDetail className="text-2xl text-[#412160]" />,
      bgColor: "bg-gray-50",
    },
    {
      id: 4,
      type: "message",
      message: "You have a new message",
      isNew: false,
      timestamp: new Date(Date.now() - 1000 * 60 * 180), // 3 hours ago
      icon: <BiMessageDetail className="text-2xl text-[#412160]" />,
      bgColor: "bg-gray-50",
    },
  ]);

  const handleNotificationClick = (notification) => {
    switch (notification.type) {
      case "ride":
        navigate("/ride-details");
        break;
      case "message":
        navigate("/chat");
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#412160] text-white p-6 flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-purple-700 rounded-full transition-all"
        >
          <FaLessThan className="text-xl text-white" />
        </button>
        <IoNotifications className="text-2xl" />
        <h1 className="text-2xl">Notification</h1>
      </div>

      {/* Notifications List */}
      <div className="divide-y divide-gray-200">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            onClick={() => handleNotificationClick(notification)}
            className={`flex items-center gap-4 p-4 cursor-pointer ${notification.bgColor} hover:bg-opacity-80 transition-colors`}
          >
            {/* Icon/Avatar */}
            <div className="flex-shrink-0">{notification.icon}</div>

            {/* Message */}
            <div className="flex-grow">
              <p className="text-[#412160] text-lg">{notification.message}</p>
              <p className="text-gray-500 text-sm">
                {notification.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            {/* New Badge */}
            {notification.isNew && (
              <div className="flex-shrink-0">
                <span className="bg-[#412160] text-white px-3 py-1 rounded-md text-sm">
                  NEW
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {notifications.length === 0 && (
        <div className="flex flex-col items-center justify-center p-8 text-gray-500">
          <IoNotifications className="text-6xl mb-4" />
          <p className="text-lg">No notifications yet</p>
        </div>
      )}
    </div>
  );
};

export default Notification;
