import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoMenuOutline } from "react-icons/io5";
import { FaStar, FaMotorcycle } from "react-icons/fa";
import MenuBar from "../Payment Menu/MenuBar";

const RatingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [rating, setRating] = useState(4);
  const [review, setReview] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Get driver details from location state (passed from booking confirmation)
  const {
    driverData = {
      name: "Driver Name",
      vehicleName: "Super Bike",
      vehicleModel: "Ducati Panigale V4",
      vehicleYear: "2018",
      phone: "9874563210",
    },
    rideDetails = {
      pickupLocation: "Central City",
      dropLocation: "Airport",
      pickupTime: "1:00 p.m",
      dropTime: "3:00 p.m",
      fare: "₹50",
    },
  } = location.state || {};

  const handleSubmit = () => {
    console.log({ rating, review, driverData });
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <>
      <MenuBar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <div className="min-h-screen bg-gray-50">
        {/* Updated Header with better positioning */}
        <div className="h-48 bg-gradient-to-br from-[#412160] to-purple-900 rounded-b-[40px] relative">
          <div className="p-5 flex items-center">
            <IoMenuOutline
              className="text-white text-2xl cursor-pointer"
              onClick={() => setIsMenuOpen(true)}
            />
            <h1 className="text-white text-2xl font-semibold absolute left-1/2 transform -translate-x-1/2">
              Rate Your Ride
            </h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative px-6 -mt-24">
          {/* Driver Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-[#412160] rounded-full flex items-center justify-center">
                <div className="text-white text-3xl">
                  {driverData.name.charAt(0)}
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-800">
                  {driverData.name}
                </h2>
                <div className="flex items-center gap-2 text-gray-600 mt-1">
                  <FaMotorcycle className="text-[#412160]" />
                  <span>{driverData.vehicleName}</span>
                </div>
                <p className="text-sm text-gray-500">
                  {driverData.vehicleModel} | {driverData.vehicleYear}
                </p>
              </div>
            </div>

            {/* Ride Details */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex justify-between text-sm">
                <div className="text-gray-500">Pickup</div>
                <div className="text-gray-800 font-medium">
                  {rideDetails.pickupLocation}
                </div>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <div className="text-gray-500">Drop</div>
                <div className="text-gray-800 font-medium">
                  {rideDetails.dropLocation}
                </div>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <div className="text-gray-500">Time</div>
                <div className="text-gray-800 font-medium">
                  {rideDetails.pickupTime} - {rideDetails.dropTime}
                </div>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <div className="text-gray-500">Fare</div>
                <div className="text-gray-800 font-medium">
                  {rideDetails.fare}
                </div>
              </div>
            </div>
          </div>

          {/* Rating Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h3 className="text-xl font-semibold text-center mb-4">
              How was your ride?
            </h3>
            <div className="flex justify-center space-x-3 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`text-4xl cursor-pointer transition-colors ${
                    star <= rating ? "text-yellow-400" : "text-gray-200"
                  }`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>

            <textarea
              className="w-full h-32 p-4 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[#412160] focus:border-transparent text-gray-700 placeholder-gray-400"
              placeholder="Share your ride experience..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={handleCancel}
              className="flex-1 py-4 border-2 border-[#412160] text-[#412160] rounded-xl font-semibold hover:bg-purple-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 py-4 bg-[#412160] text-white rounded-xl font-semibold hover:bg-purple-800 transition-colors"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RatingPage;
