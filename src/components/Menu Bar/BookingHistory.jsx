import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaLessThan } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

const Bookings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("CURRENT");
  const [bookings, setBookings] = useState({ PAST: [], CURRENT: [] });

  useEffect(() => {
    // Fetch bookings from your backend/state
    const fetchBookings = async () => {
      try {
        const response = await fetch("/api/bookings");
        const data = await response.json();

        // Separate into past and current bookings
        const past = data.filter(
          (booking) => new Date(booking.dateTime) < new Date()
        );
        const current = data.filter(
          (booking) => new Date(booking.dateTime) >= new Date()
        );

        setBookings({ PAST: past, CURRENT: current });
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  // Sample bookings data with both past and current bookings
  const bookingsData = {
    PAST: [
      {
        id: 1,
        driverName: "Driver Name",
        dateTime: "July/21/21, 7:15PM",
        vehicleType: "Maruti Suzuki",
        price: "150.46",
        rating: 4,
      },
      {
        id: 2,
        driverName: "Driver Name",
        dateTime: "July/21/21, 7:15PM",
        vehicleType: "Maruti Suzuki",
        price: "150.46",
        rating: 4,
      },
      {
        id: 3,
        driverName: "Driver Name",
        dateTime: "July/21/21, 7:15PM",
        vehicleType: "Maruti Suzuki",
        price: "150.46",
        rating: 4,
      },
      {
        id: 4,
        driverName: "Driver Name",
        dateTime: "July/21/21, 7:15PM",
        vehicleType: "Maruti Suzuki",
        price: "150.46",
        rating: 4,
      },
      {
        id: 5,
        driverName: "Driver Name",
        dateTime: "July/21/21, 7:15PM",
        vehicleType: "Maruti Suzuki",
        price: "150.46",
        rating: 4,
      },
    ],
    CURRENT: [
      {
        id: 101,
        driverName: "Rahul Kumar",
        dateTime: "Today, 2:30PM",
        vehicleType: "Maruti Swift",
        price: "180.50",
        status: "On the way",
        estimatedTime: "10 mins",
        pickupPoint: "",
        dropPoint: "ISBT",
      },
    ],
  };

  const StarRating = ({ rating }) => (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          className={`text-xl ${
            star <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );

  const CurrentBookingCard = ({ booking }) => (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-[#412160] text-lg font-medium">
          {booking.driverName}
        </h3>
        <span className="text-[#412160] font-medium">₹{booking.price}</span>
      </div>
      <div className="text-gray-600 mb-2">{booking.dateTime}</div>
      <div className="text-gray-400 mb-3">{booking.vehicleType}</div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-[#412160]">Pickup: </span>
          <span className="text-gray-600">{booking.pickupPoint}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span className="text-[#412160]">Drop: </span>
          <span className="text-gray-600">{booking.dropPoint}</span>
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <span className="text-[#412160] font-medium">{booking.status}</span>
        {booking.estimatedTime && (
          <span className="text-green-600">ETA: {booking.estimatedTime}</span>
        )}
      </div>
    </div>
  );

  const PastBookingCard = ({ booking }) => (
    <div className="border-b border-gray-200 py-4">
      <div className="flex justify-between items-start mb-1">
        <h3 className="text-[#412160] text-lg font-medium">
          {booking.driverName}
        </h3>
        <span className="text-[#412160] font-medium">₹{booking.price}</span>
      </div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-gray-600">{booking.dateTime}</span>
        <StarRating rating={booking.rating} />
      </div>
      <p className="text-gray-400">{booking.vehicleType}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-[#412160] text-white">
        <div className="p-6 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-purple-700 rounded-full transition-all"
          >
            <FaLessThan className="text-xl text-white" />
          </button>
          <FaClock className="text-2xl" />
          <h1 className="text-2xl">Your Bookings</h1>
        </div>

        {/* Tabs */}
        <div className="flex">
          <button
            onClick={() => setActiveTab("PAST")}
            className={`flex-1 py-4 text-center text-lg transition-colors ${
              activeTab === "PAST"
                ? "bg-gray-200 text-[#412160]"
                : "bg-[#4f2875] text-white"
            }`}
          >
            PAST
          </button>
          <button
            onClick={() => setActiveTab("CURRENT")}
            className={`flex-1 py-4 text-center text-lg transition-colors ${
              activeTab === "CURRENT"
                ? "bg-gray-200 text-[#412160]"
                : "bg-[#4f2875] text-white"
            }`}
          >
            CURRENT
          </button>
        </div>
      </div>

      {/* Bookings List */}
      <div className="p-4">
        {bookings[activeTab].length > 0 ? (
          bookings[activeTab].map((booking) =>
            activeTab === "CURRENT" ? (
              <CurrentBookingCard key={booking.id} booking={booking} />
            ) : (
              <PastBookingCard key={booking.id} booking={booking} />
            )
          )
        ) : (
          <div className="flex flex-col items-center justify-center p-8 text-gray-500">
            <FaClock className="text-6xl mb-4" />
            <p className="text-lg">No {activeTab.toLowerCase()} bookings</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;
