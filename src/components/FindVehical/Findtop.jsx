import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FaLessThan } from "react-icons/fa";

const Findtop = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchData = location.state || {};

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
    <div className="bg-[#412160] text-white">
      <div className="container mx-auto">
        <div className="flex justify-between items-center px-4 py-3">
          {/* Back Button and Title Section */}
          <div className="flex items-center flex-1">
            <button
              onClick={() => navigate("/getride")}
              className="p-2 hover:bg-purple-700 rounded-full transition-all mr-3"
            >
              <FaLessThan className="text-xl text-white" />
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

          {/* Filter Link */}
          <Link
            to="/filter"
            state={searchData}
            className="bg-[#ffffff] text-purple-900 px-6 py-2 rounded-lg font-medium hover:bg-white transition-colors"
          >
            Filter
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Findtop;
