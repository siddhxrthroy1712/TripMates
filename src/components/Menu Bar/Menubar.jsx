import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoNotifications } from "react-icons/io5";
import { FaHistory, FaSignOutAlt } from "react-icons/fa";
import { IoSettings, IoClose } from "react-icons/io5";
import { BiSupport } from "react-icons/bi";

const UserProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const passengerName = location.state?.passengerName || "Saiyam";

  const handleMenuClick = (route) => {
    switch (route) {
      case "notification":
        navigate("/notification");
        break;
      case "booking-history":
        navigate("/booking-history");
        break;
      case "settings":
        navigate("/settings");
        break;
      case "contact-support":
        navigate("/support");
        break;
      case "logout":
        setShowLogoutPopup(true);
        break;
      default:
        break;
    }
  };

  const handleLogout = () => {
    // Clear any stored user data/tokens
    localStorage.removeItem("userToken"); // If you're using token-based auth
    localStorage.clear(); // Clear all stored data
    sessionStorage.clear(); // Clear session data if any

    // Close the popup and navigate to signin page
    setShowLogoutPopup(false);
    navigate("/signin"); // Make sure this matches your signin route
  };

  // Logout Confirmation Popup
  const LogoutPopup = () => (
    <div className="fixed inset-0 bg-purple-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
        <h2 className="text-xl text-[#412160] font-semibold mb-4">
          Logout Confirmation
        </h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to logout from your account?
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => setShowLogoutPopup(false)}
            className="flex-1 px-4 py-2 border border-[#412160] text-[#412160] rounded-lg hover:bg-gray-50 transition-colors"
          >
            No, Cancel
          </button>
          <button
            onClick={handleLogout}
            className="flex-1 px-4 py-2 bg-[#412160] text-white rounded-lg hover:bg-[#4f2875] transition-colors"
          >
            Yes, Logout
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Header */}
      <div className="bg-[#412160] text-white p-6">
        <div className="relative flex flex-col items-center">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 top-0 p-2 hover:bg-purple-700 rounded-full transition-all z-10 pointer-events-auto"
            type="button"
          >
            <IoClose className="text-2xl text-white" />
          </button>

          <div className="flex flex-col items-center gap-4 mb-4 mt-8">
            <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
            <h1 className="text-2xl">{passengerName}</h1>
          </div>

          <button
            onClick={() => navigate("/profile")}
            className="flex cursor-pointer items-center justify-between w-full bg-[#4f2875] p-4 rounded-lg"
          >
            <span>View Profile</span>
          </button>
        </div>
      </div>

      {/* Menu Items */}
      <div className="p-6 space-y-6">
        <MenuItem
          icon={<IoNotifications />}
          text="Notification"
          onClick={() => handleMenuClick("notification")}
        />
        <MenuItem
          icon={<FaHistory />}
          text="Booking History"
          onClick={() => handleMenuClick("booking-history")}
        />
        <MenuItem
          icon={<IoSettings />}
          text="Settings"
          onClick={() => handleMenuClick("settings")}
        />
        <MenuItem
          icon={<BiSupport />}
          text="Contact Support"
          onClick={() => handleMenuClick("contact-support")}
        />
        <MenuItem
          icon={<FaSignOutAlt />}
          text="Logout"
          onClick={() => handleMenuClick("logout")}
        />
      </div>

      {/* Version Number */}
      <div className="absolute bottom-8 left-6 flex items-center gap-2">
        <span className="text-gray-600">Version</span>
        <span className="text-gray-400">v1.0</span>
      </div>

      {/* Logout Popup */}
      {showLogoutPopup && <LogoutPopup />}
    </div>
  );
};

// Helper component for menu items
const MenuItem = ({ icon, text, onClick }) => (
  <div
    className="flex items-center gap-4 text-[#412160] text-lg cursor-pointer hover:bg-gray-100 p-2 rounded"
    onClick={onClick}
  >
    {icon}
    <span>{text}</span>
  </div>
);

export default UserProfile;
