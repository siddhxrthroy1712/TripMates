import React from "react";
import { FaStar, FaUser } from "react-icons/fa";
// Removed: import carImage from "../../assets/bg1.png";

const VehicalCard = ({
  searchHistory,
  availableRides,
  onClick,
  driverName,
  rating,
  reviews,
  price,
  vehicleName,
  vehicleColor,
  departureTime,
  arrivalTime,
  distance,
}) => {
  const formatDate = (dateString) => {
    if (!dateString) return "Today";
    const date = new Date(dateString);
    const today = new Date();
    if (date.toDateString() === today.toDateString()) {
      return "Today";
    }
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow relative"
    >
      <div className="flex items-start gap-4">
        <div className="w-32 h-32 flex-shrink-0 overflow-hidden">
          {/* Increased image size and added overflow hidden */}
          <img
            src="/assets/bg1.png"
            alt="Vehicle"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg">
                {driverName || "Driver Name"}
              </h3>
              {/* Display driver name or default */}
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <FaStar className="text-yellow-400" />
                <span>
                  {rating || "4.5"}/5 - {reviews || "13"} ratings
                </span>
                {/* Display rating and reviews or defaults */}
              </div>
            </div>
            <span className="text-lg font-bold text-purple-600">
              ₹{price || "500"}
            </span>
            {/* Display price or default */}
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FaUser className="text-xs" />
            <span>{distance || "8.7"} km from your departure</span>
            {/* Display distance or default */}
          </div>

          <div className="text-sm text-gray-700">
            <span>{vehicleName || "Vehicle Name"} • </span>
            {/* Display vehicle name or default */}
            <span>{vehicleColor || "Vehicle Color"}</span>
            {/* Display vehicle color or default */}
          </div>

          <div className="text-sm text-gray-700 flex justify-between">
            {/* Added justify-between for time */}
            <span>{departureTime || "Departure Time"}</span>
            {/* Display departure time or default */}
            <span>{arrivalTime || "Arrival Time"}</span>
            {/* Display arrival time or default */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicalCard;