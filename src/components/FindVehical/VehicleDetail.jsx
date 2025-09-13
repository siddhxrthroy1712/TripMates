import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaLessThan, FaStar, FaUser } from "react-icons/fa";
import { BsChatDots } from "react-icons/bs";
import { IoPeople } from "react-icons/io5";


const VehicleDetail = () => {
  // ... (state and functions - same as before)
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state || {};
  const searchData = location.state || {};
  const [showModal, setShowModal] = React.useState(false);

  const handleBooking = () => {
    setShowModal(true);
  };

  const handleConfirmRide = () => {
    setShowModal(false);
    navigate("/ride-otp");
  };

  const formatDisplayDate = (dateString) => {
    if (!dateString) return "Today";

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDateObj = new Date(dateString);
    selectedDateObj.setHours(0, 0, 0, 0);

    if (today.getTime() === selectedDateObj.getTime()) {
      return "Today";
    }

    return selectedDateObj.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#412160] text-white p-4">
        <div className="container mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-purple-700 rounded-full transition-all"
          >
            <FaLessThan className="text-xl" />
          </button>
          <div>
            <h1 className="text-lg font-semibold">
              {searchData.leavingFrom?.split(",")[0] || "Mussoorie"} to{" "}
              {searchData.goingTo?.split(",")[0] || "Dehradun"}
            </h1>
            <p className="text-sm opacity-90">
              {formatDisplayDate(searchData.selectedDate)},{" "}
              {searchData.passengerCount || 1} Passenger
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-6 space-y-6 mb-24">
          {/* Date and Price */}
          <div className="flex justify-between items-start">
            <h2 className="text-xl font-bold">Mon 12 July</h2>{" "}
            {/* Make this dynamic */}
            <div className="text-right">
              <p className="text-sm text-gray-600">
                Total price for {data.passengerCount} passenger
              </p>
              <p className="text-xl font-bold text-purple-600">₹{data.price}</p>
            </div>
          </div>

          {/* Journey Details */}
          <div className="space-y-6">
            <JourneyPoint
              time={data.departureTime}
              location={data.fromLocation}
              distance={data.distance}
            />
            <JourneyPoint time={data.arrivalTime} location={data.toLocation} />
          </div>

          {/* Driver Details */}
          <div className="border-t pt-4">
            <div
              onClick={() =>
                navigate("/user-profile", {
                  state: {
                    driverData: {
                      name: data.driverName,
                      age: "45 y/o",
                      experience: "Newcomer",
                      email: "confirmed",
                      phone: "confirmed",
                      about: "I'm chatty when I feel comfortable",
                      ridesPublished: 2,
                      memberSince: "January 2025",
                    },
                  },
                })
              }
              className="flex items-center gap-3 cursor-pointer"
            >
              <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
                <img
                  src="/assets/bg1.png"
                  alt="Driver"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium">{data.driverName}</h3>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <FaStar className="text-yellow-400" />
                  <span>
                    {data.rating}/5 - {data.reviews} ratings
                  </span>
                </div>
              </div>
              <FaLessThan className="transform rotate-180 text-gray-400 ml-auto" />
            </div>
          </div>

          {/* Contact Button */}
          <button
            onClick={() => navigate("/chat")}
            className="flex items-center gap-2 w-full p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <BsChatDots className="text-purple-600" />
            <span className="text-purple-600 font-medium">
              Contact {data.driverName}
            </span>
            <FaLessThan className="transform rotate-180 text-gray-400 ml-auto" />
          </button>

          {/* Passenger & Car Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-gray-700">
              <IoPeople />
              <span>Max, {data.passengerCount} in the back seats</span>
            </div>
            <div className="space-y-1">
              <h3 className="font-medium">{data.vehicleName}</h3>
              <p className="text-gray-600">{data.vehicleColor}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Book Now Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
        <div className="container mx-auto p-4">
          <button
            onClick={handleBooking}
            className="w-full bg-[#412160] text-white py-3.5 rounded-full font-semibold text-lg"
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-purple-950 bg-opacity-90 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-purple-900 rounded-full flex items-center justify-center mx-auto">
                <svg
                  className="w-8 h-8 text-purple-100"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">
                Thanks for booking!
              </h2>
              <p className="text-gray-600">
                Your booking has been placed and sent to{" "}
                {data.driverName || "Saiyam Tuteja"}
              </p>
              <button
                onClick={handleConfirmRide}
                className="w-full bg-[#380070] text-white py-3 rounded-lg font-semibold"
              >
                Confirm Ride
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const JourneyPoint = ({ time, location, distance }) => (
  <div className="flex gap-4">
    <div className="w-20 text-gray-700">{time}</div>
    <div className="flex-1">
      <div className="flex items-start gap-2">
        <div className="w-2 h-2 mt-2 rounded-full bg-purple-600"></div>
        <div>
          <p className="font-medium">{location}</p>
          <p className="text-sm text-gray-600">Uttarakhand</p>
          {distance && (
            <div className="flex items-center gap-1 text-purple-600 text-sm mt-1">
              <FaUser className="text-xs" />
              <span>{distance} km from your departure</span>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default VehicleDetail;