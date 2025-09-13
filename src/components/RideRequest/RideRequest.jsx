import React, { useState, useRef, useEffect } from "react";
import MenuBar from "../Payment Menu/MenuBar";
import { IoMenuOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
const RideRequest = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const acceptCircleRef = useRef(null);
  const cancelCircleRef = useRef(null);
  const navigate = useNavigate();
  const handleAccept = () => {
    if (acceptCircleRef.current) {
      acceptCircleRef.current.style.transition = "transform 0.5s linear";
      acceptCircleRef.current.style.transform = "translateX(100%)";
      setTimeout(() => {
        setIsAccepted(true);
        navigate("/getride");
        // alert("Ride Accepted!");
      }, 500);
    }
  };

  const handleCancel = () => {
    if (cancelCircleRef.current) {
      cancelCircleRef.current.style.transition = "transform 0.5s linear";
      cancelCircleRef.current.style.transform = "translateX(-100%)";

      setTimeout(() => {
        setIsCancelled(true);
        navigate("/");
        // alert("Ride Cancelled!");
      }, 500);
    }
  };

  useEffect(() => {
    if (acceptCircleRef.current) {
      const button = acceptCircleRef.current.parentElement;
      acceptCircleRef.current.style.width = button.offsetWidth + "px";
      acceptCircleRef.current.style.height = button.offsetHeight + "px";
      acceptCircleRef.current.style.borderRadius = "0";
    }
    if (cancelCircleRef.current) {
      const button = cancelCircleRef.current.parentElement;
      cancelCircleRef.current.style.width = button.offsetWidth + "px";
      cancelCircleRef.current.style.height = button.offsetHeight + "px";
      cancelCircleRef.current.style.borderRadius = "0";
    }
  }, []);

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <div className="relative">
        <MenuBar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        <div className="py-2 flex-col bg-purple-900">
          <div className="flex items-center">
            <IoMenuOutline
              className="text-white text-6xl cursor-pointer"
              onClick={() => setIsMenuOpen(true)}
            />
            <h2 className="text-2xl font-bold text-center text-white mt-0 mb-4 mx-auto">
              Home
            </h2>
          </div>
        </div>
      </div>

      <div className="flex-grow flex items-center justify-center">
        <div className="bg-gray-100 rounded-lg shadow-md p-6 w-full max-w-md md:max-w-lg lg:max-w-xl">
          <h2 className="text-2xl font-bold text-center text-purple-900 mb-4">
            Ride Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-lg font-medium">Passenger Name</p>
              <p>Wed 12/02/25</p>
              <p>01:05 PM</p>
            </div>
            <div>
              <p className="text-lg font-medium">Contact Number</p>
              <p>XXXXXXXXXX</p>
            </div>
            <div>
              <p className="text-lg font-medium">Pickup Point</p>
              <p>Central City</p>
            </div>
            <div>
              <p className="text-lg font-medium">Drop Location</p>
              <p>Airport</p>
            </div>
            <div>
              <p className="text-lg font-medium">Distance</p>
              <p>10 KM</p>
            </div>
            <div>
              <p className="text-lg font-medium">Price</p>
              <p>₹50</p>
            </div>
          </div>
          <div className="mt-6">
            <div className="relative mb-4 overflow-hidden">
              <button
                className={`bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg w-full relative transition-none`}
                onClick={handleAccept}
                disabled={isAccepted}
              >
                <span className="relative z-10">Accept</span>
                <div
                  className="absolute top-0 left-0 h-full w-0 bg-green-300"
                  ref={acceptCircleRef}
                ></div>
              </button>
            </div>
            <div className="relative overflow-hidden">
              <button
                className={`bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg w-full relative transition-none`}
                onClick={handleCancel}
                disabled={isCancelled}
              >
                <span className="relative z-10">Slide to Cancel</span>
                <div
                  className="absolute top-0 right-0 h-full w-0 bg-red-300"
                  ref={cancelCircleRef}
                ></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RideRequest;
