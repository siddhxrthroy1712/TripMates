import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/splash-1.png";

const RideDetails = () => {
  const navigate = useNavigate();

  const [rides, setRides] = useState([
    {
      id: 1,
      passenger: "John Doe",
      pickup: "Roorkee",
      dropoff: "Delhi",
      time: "2024-07-20 10:00 AM",
      status: "Pending",
    },
    {
      id: 2,
      passenger: "Jane Smith",
      pickup: "Haridwar",
      dropoff: "Dehradun",
      time: "2024-07-21 02:00 PM",
      status: "Confirmed",
    },
    {
      id: 3,
      passenger: "David Lee",
      pickup: "Roorkee",
      dropoff: "Chandigarh",
      time: "2024-07-22 09:00 AM",
      status: "Pending",
    },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setRides((prevRides) =>
      prevRides.map((ride) =>
        ride.id === id ? { ...ride, status: newStatus } : ride
      )
    );
  };

  return (
    <div className="min-h-screen bg-purple-50 p-4">
      <nav className="bg-purple-700 p-4 mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <img src={logo} alt="Your Logo" className="h-11 w-11 mr-2" />
          <span className="text-white text-xl font-bold">UNIGO!</span>
        </div>
        <div>
          <button
            className="text-white mr-4"
            onClick={() => navigate("/profile")}
          >
            Profile
          </button>
          <button className="text-white" onClick={() => navigate("/signin")}>
            Logout
          </button>
        </div>
      </nav>

      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-purple-900">
          Ride Requests
        </h1>

        {rides.length === 0 ? (
          <p className="text-gray-300">No ride requests found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rides.map((ride) => (
              <div
                key={ride.id}
                className="bg-purple-100 rounded-lg shadow-md p-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold">Ride ID: {ride.id}</span>
                  <span
                    className={`px-2 py-1 rounded-md text-sm ${
                      ride.status === "Pending"
                        ? "bg-yellow-200 text-yellow-800"
                        : ride.status === "Confirmed"
                        ? "bg-green-200 text-green-800"
                        : ride.status === "Cancelled"
                        ? "bg-red-200 text-red-800"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {ride.status}
                  </span>
                </div>
                <p>Passenger: {ride.passenger}</p>
                <p>Pickup: {ride.pickup}</p>
                <p>Dropoff: {ride.dropoff}</p>
                <p>Time: {ride.time}</p>

                <div className="mt-4 flex flex-col md:flex-row gap-2">
                  {ride.status === "Pending" && (
                    <button
                      onClick={() => handleStatusChange(ride.id, "Confirmed")}
                      className="px-2 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                      Confirm
                    </button>
                  )}
                  {(ride.status === "Pending" ||
                    ride.status === "Confirmed") && (
                    <button
                      onClick={() => handleStatusChange(ride.id, "Cancelled")}
                      className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Cancel
                    </button>
                  )}
                  <button className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RideDetails;
