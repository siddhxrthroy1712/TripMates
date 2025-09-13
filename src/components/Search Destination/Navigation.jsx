import React, { useState, useRef, useEffect } from "react";
import { LuCirclePlus } from "react-icons/lu";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import PassengerProfile from "../Menu Bar/PassangerProfile";

const Navigation = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const accountButtonRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleAccountClick = () => {
    navigate("/profile");
  };

  const handlePublshRideClick = () => {
    navigate("/Sechdule-ride");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        accountButtonRef.current &&
        !accountButtonRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="navigation bg-white flex items-center justify-between py-3 px-6">
      <div className="flex items-center gap-6">
      <img
        src="/assets/logo.png"
        alt="Logo"
        className="h-24 w-24 object-contain"
/>
      </div>
      <div className="flex items-center gap-8">
        <button
          className="flex text-xl items-center gap-4 bg-purple-800 text-white px-6 py-3 rounded-lg shadow-md hover:bg-purple-500"
          onClick={handlePublshRideClick}
        >
          <LuCirclePlus className="text-3xl" />
          Publish Ride
        </button>
        <div className="relative text-3xl">
          <button
            ref={accountButtonRef}
            onClick={handleAccountClick} // Update to handle account button click
            className="text-purple-900 flex items-center gap-3 focus:outline-none"
          >
            <FaUserCircle className="text-3xl" />
            <span>Account</span>
            <i className="fas fa-chevron-down"></i>
          </button>
          {/* {isDropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute bg-white text-gray-700 mt-2 py-2 w-40 rounded-lg shadow-lg"
            >
              <a href="/login" className="block px-4 py-2 hover:bg-gray-200">
                Login
              </a>
              <a href="/signup" className="block px-4 py-2 hover:bg-gray-200">
                Sign Up
              </a>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
