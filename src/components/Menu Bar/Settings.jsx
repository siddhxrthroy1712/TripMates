import React from "react";
import { useNavigate } from "react-router-dom";
import { FaLessThan, FaGreaterThan } from "react-icons/fa";
import { IoNotifications, IoSettings } from "react-icons/io5";
import { FaLock, FaMapMarkerAlt, FaInfoCircle } from "react-icons/fa";
// Removed: import unigoLogo from "../../assets/logo.png";
const Settings = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      icon: <IoNotifications className="text-2xl" />,
      text: "Notification",
      route: "/notification",
    },
    {
      icon: <FaLock className="text-2xl" />,
      text: "Change Password",
      route: "/change-pass",
    },

    {
      icon: <IoSettings className="text-2xl" />,
      text: "App Settings",
      route: "/app-settings",
    },
    {
      icon: <FaInfoCircle className="text-2xl" />,
      text: "About",
      route: "/about-us",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-[#412160] text-white p-6 flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-purple-700 rounded-full transition-all"
        >
          <FaLessThan className="text-xl text-white" />
        </button>
        <IoSettings className="text-2xl" />
        <h1 className="text-2xl">Settings</h1>
      </div>

      {/* Menu Items */}
      <div className="flex-grow">
        {menuItems.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(item.route)}
            className="flex items-center justify-between px-6 py-5 border-b border-gray-100 cursor-pointer hover:bg-gray-50"
          >
            <div className="flex items-center gap-4 text-[#412160]">
              {item.icon}
              <span className="text-xl">{item.text}</span>
            </div>
            <FaGreaterThan className="text-[#412160]" />
          </div>
        ))}
      </div>

      {/* Logo at bottom */}
      <div className="flex justify-center items-center p-8">
        <img src="/assets/logo.png" alt="Unigo Logo" className="w-32 h-auto" />
      </div>
    </div>
  );
};

export default Settings;