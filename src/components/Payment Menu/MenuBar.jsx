import React from "react";
import { Link } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";
import {
  FaUser,
  FaHistory,
  FaQuestionCircle,
  FaCog,
  FaHome,
} from "react-icons/fa";

const MenuBar = ({ isOpen, onClose }) => {
  const menuItems = [
    { icon: <FaHome />, text: "Home", path: "/home" },
    { icon: <FaUser />, text: "Profile", path: "/profile" },
    { icon: <FaHistory />, text: "Ride History", path: "/booking-history" },
    { icon: <FaQuestionCircle />, text: "Help & Support", path: "/support" },
    { icon: <FaCog />, text: "Settings", path: "/settings" },
  ];

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity z-40 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-semibold text-purple-900">Menu</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <IoCloseOutline size={24} />
          </button>
        </div>

        {/* Menu Items */}
        <div className="py-4">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="flex items-center px-6 py-4 text-gray-700 hover:bg-purple-50 transition-colors"
              onClick={onClose}
            >
              <span className="text-purple-900">{item.icon}</span>
              <span className="ml-4">{item.text}</span>
            </Link>
          ))}
        </div>

        {/* Version */}
        <div className="absolute bottom-8 left-6 text-sm text-gray-500">
          Version 1.0.0
        </div>
      </div>
    </>
  );
};

export default MenuBar;
