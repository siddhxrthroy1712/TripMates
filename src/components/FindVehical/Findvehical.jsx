import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import VehicalCard from "./VehicalCard";
import Findtop from "./Findtop";
// Removed: import bg1 from "../../assets/bg1.png";
import Footer from "../Search Destination/Footer";

const FindVehical = () => {
  const location = useLocation();
  const searchData = location.state || {};
  const navigate = useNavigate();
  const handleCreateRideBtn = () => {
    navigate("/Sechdule-ride");
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(/assets/bg1.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: "0.15",
        }}
      />

      {/* Content Container */}
      <div className="relative z-10">
        <Findtop />

        {/* Search Details */}
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-800">
                {searchData.selectedDate
                  ? new Date(searchData.selectedDate).toLocaleDateString(
                      "en-US",
                      {
                        weekday: "short",
                        day: "numeric",
                        month: "short",
                      }
                    )
                  : "Today"}
              </span>
              <span className="text-gray-500">
                {searchData.leavingFrom} → {searchData.goingTo}
              </span>
            </div>
            <span className="text-gray-600">2 rides available</span>
          </div>
        </div>

        {/* Vehicle Cards */}
        <main className="container mx-auto py-6 px-4 md:px-6 lg:px-8 space-y-6">
          <VehicalCard
            searchHistory={{
              fromLocation: searchData.leavingFrom,
              toLocation: searchData.goingTo,
              selectedDate: searchData.selectedDate,
              passengerCount: searchData.passengerCount,
            }}
            availableRides={2}
            onClick={() =>
              navigate("/vehicle-detail", {
                state: {
                  ...searchData,
                  driverName: "Saiyam Tuteja",
                  rating: "4.5",
                  reviews: "13",
                  price: "500",
                  vehicleName: "Aviator New",
                  vehicleColor: "White",
                  departureTime: "05:00 PM",
                  arrivalTime: "07:00 PM",
                  distance: "8.7",
                },
              })
            }
          />
          <VehicalCard
            searchHistory={{
              fromLocation: searchData.leavingFrom,
              toLocation: searchData.goingTo,
              selectedDate: searchData.selectedDate,
              passengerCount: searchData.passengerCount,
            }}
            availableRides={2}
            onClick={() => navigate("/vehicle-detail", { state: searchData })}
          />
          <VehicalCard
            searchHistory={{
              fromLocation: searchData.leavingFrom,
              toLocation: searchData.goingTo,
              selectedDate: searchData.selectedDate,
              passengerCount: searchData.passengerCount,
            }}
            availableRides={2}
            onClick={() => navigate("/vehicle-detail", { state: searchData })}
          />
        </main>

        {/* Centered Button */}
        <div className="flex justify-center mt-6 mb-6">
          {/* or use grid: grid place-items-center mt-6 */}
          <button
            onClick={handleCreateRideBtn}
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded text-2xl"
          >
            Create Your Ride
          </button>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default FindVehical;