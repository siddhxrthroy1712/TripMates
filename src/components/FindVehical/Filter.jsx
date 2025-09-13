import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { FaCar, FaMotorcycle } from "react-icons/fa";

const Filter = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchData = location.state || {};

  const [sortBy, setSortBy] = useState("");
  const [departureTime, setDepartureTime] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [trustSafety, setTrustSafety] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState("car");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#412160] text-white p-4 flex justify-between items-center">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-purple-700 rounded-full transition-all"
        >
          <IoClose className="text-2xl cursor-pointer" />
        </button>
        <button
          onClick={() => {
            setSortBy("");
            setDepartureTime([]);
            setAmenities([]);
            setTrustSafety([]);
          }}
          className="text-lg font-medium cursor-pointer"
        >
          Clear all
        </button>
      </div>

      {/* Filter Content */}
      <div className="p-6 space-y-6 pb-32">
        <h1 className="text-2xl font-bold text-purple-900">Filter</h1>

        {/* Sort By Section */}
        <div>
          <h2 className="text-xl font-semibold text-purple-900 mb-4">
            Sort by
          </h2>
          <div className="space-y-3">
            {[
              "Earliest departure",
              "Lowest price",
              "Close to departure",
              "Close to arrival",
              "Shortest ride",
            ].map((option) => (
              <label
                key={option}
                className="flex items-center gap-3 cursor-pointer"
              >
                <input
                  type="radio"
                  name="sortBy"
                  value={option}
                  checked={sortBy === option}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-5 h-5 text-[#412160] border-gray-300 focus:ring-[#412160] focus:ring-offset-0"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Departure Time Section */}
        <div>
          <h2 className="text-xl font-semibold text-purple-900 mb-4">
            Departure time
          </h2>
          <div className="space-y-3">
            {["Before 06:00", "06:00-12:00", "12:01-18:00", "After 18:00"].map(
              (time) => (
                <label
                  key={time}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={departureTime.includes(time)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setDepartureTime([...departureTime, time]);
                      } else {
                        setDepartureTime(
                          departureTime.filter((t) => t !== time)
                        );
                      }
                    }}
                    className="w-5 h-5 text-[#412160] border-gray-300 rounded focus:ring-[#412160] focus:ring-offset-0"
                  />
                  <span className="text-gray-700">{time}</span>
                </label>
              )
            )}
          </div>
        </div>

        {/* Trust and Safety Section */}
        <div>
          <h2 className="text-xl font-semibold text-purple-900 mb-4">
            Trust and safety
          </h2>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={trustSafety.includes("verified")}
              onChange={(e) => {
                if (e.target.checked) {
                  setTrustSafety([...trustSafety, "verified"]);
                } else {
                  setTrustSafety(trustSafety.filter((t) => t !== "verified"));
                }
              }}
              className="w-5 h-5 text-[#412160] border-gray-300 rounded focus:ring-[#412160] focus:ring-offset-0"
            />
            <span className="text-gray-700">Verified Profile</span>
          </label>
        </div>

        {/* Amenities Section */}
        <div>
          <h2 className="text-xl font-semibold text-purple-900 mb-4">
            Amenities
          </h2>
          <div className="space-y-3">
            {[
              "Max.2 in the back",
              "Instant Booking",
              "Smoking allowed",
              "Pets allowed",
            ].map((amenity) => (
              <label
                key={amenity}
                className="flex items-center gap-3 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={amenities.includes(amenity)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setAmenities([...amenities, amenity]);
                    } else {
                      setAmenities(amenities.filter((a) => a !== amenity));
                    }
                  }}
                  className="w-5 h-5 text-[#412160] border-gray-300 rounded focus:ring-[#412160] focus:ring-offset-0"
                />
                <span className="text-gray-700">{amenity}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Choose Vehicles Section */}
        <div>
          <h2 className="text-xl font-semibold text-purple-900 mb-4">
            Choose Vehicles
          </h2>
          <div className="flex gap-4">
            <button
              onClick={() => setSelectedVehicle("car")}
              className={`flex-1 p-4 rounded-lg transition-all flex items-center justify-center ${
                selectedVehicle === "car"
                  ? "bg-[#412160] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <FaCar className="text-3xl" />
            </button>
            <button
              onClick={() => setSelectedVehicle("bike")}
              className={`flex-1 p-4 rounded-lg transition-all flex items-center justify-center ${
                selectedVehicle === "bike"
                  ? "bg-[#412160] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <FaMotorcycle className="text-3xl" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Fixed Section */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
        <button
          onClick={() => navigate(-1)}
          className="w-full bg-[#412160] text-white py-3 rounded-lg font-semibold text-lg"
        >
          Filter
        </button>
      </div>
    </div>
  );
};

export default Filter;
