import React, { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { IoMenuOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import MenuBar from "../Payment Menu/MenuBar";

function PaymentComplete() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { timestamp = new Date().toLocaleString() } = location.state || {};

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/rating", {
        state: {
          driverName: "Driver Name",
          rideDetails: {
            from: "Central City",
            to: "Airport",
            time: "1:00 p.m to 3:00 p.m",
          },
        },
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <>
      <MenuBar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <div className="min-h-screen bg-white p-5">
        <div className="py-2">
          <IoMenuOutline
            className="text-purple-900 text-2xl cursor-pointer"
            onClick={() => setIsMenuOpen(true)}
          />
        </div>

        <div className="flex flex-col items-center text-center pt-10">
          <h1 className="text-purple-900 text-2xl mb-10">
            Your ride Completed
          </h1>

          <div className="mb-10">
            <h2 className="text-purple-900 text-3xl mb-5">Total Amount</h2>
            <div className="text-5xl font-bold">₹50</div>
          </div>

          <div className="w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center my-8">
            <FaCheck className="text-white text-4xl" />
          </div>

          <div className="text-gray-600 text-xl mb-5">
            Pay while reaching destination
          </div>

          <div className="text-gray-400 text-base mb-10">
            {formatTimestamp(timestamp)}
          </div>

          <div className="fixed bottom-0 left-0 right-0 text-center bg-gray-100 p-5 text-purple-900 text-lg">
            Thankyou For Choosing Us!
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentComplete;
