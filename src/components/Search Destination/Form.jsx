import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "../Calendar";
import { FaMinus, FaPlus, FaHistory } from "react-icons/fa";

const SearchForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    leavingFrom: "",
    goingTo: "",
    selectedDate: new Date(),
    passengerCount: 1,
  });

  const [showCalendar, setShowCalendar] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);

  // Load search history from localStorage on component mount
  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("searchHistory")) || [];
    setSearchHistory(history);
  }, []);

  const handlePassengerCount = (action) => {
    if (action === "increment" && formData.passengerCount < 4) {
      setFormData({ ...formData, passengerCount: formData.passengerCount + 1 });
    } else if (action === "decrement" && formData.passengerCount > 1) {
      setFormData({ ...formData, passengerCount: formData.passengerCount - 1 });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save to search history
    const newHistory = [formData, ...searchHistory.slice(0, 3)];
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));
    setSearchHistory(newHistory);
    // Navigate to find-vehicle page with form data
    navigate("/find-vehicle", { state: formData });
  };

  const handleHistoryClick = (historyItem) => {
    setFormData({
      ...historyItem,
      selectedDate: new Date(historyItem.selectedDate), // Convert string date back to Date object
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 w-full max-w-4xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
        Search Your Destination
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        {/* Form Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Leaving From */}
          <div className="space-y-1 sm:space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Leaving From
            </label>
            <input
              type="text"
              value={formData.leavingFrom}
              onChange={(e) =>
                setFormData({ ...formData, leavingFrom: e.target.value })
              }
              placeholder="Enter pickup location"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
              required
            />
          </div>

          {/* Going To */}
          <div className="space-y-1 sm:space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Going To
            </label>
            <input
              type="text"
              value={formData.goingTo}
              onChange={(e) =>
                setFormData({ ...formData, goingTo: e.target.value })
              }
              placeholder="Enter drop location"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
              required
            />
          </div>

          {/* Passenger Count */}
          <div className="space-y-1 sm:space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Passengers
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                type="button"
                onClick={() => handlePassengerCount("decrement")}
                className="px-3 sm:px-4 py-2 sm:py-3 text-purple-600 hover:bg-gray-100 rounded-l-lg transition-colors"
                disabled={formData.passengerCount <= 1}
              >
                <FaMinus className="text-sm sm:text-base" />
              </button>
              <span className="flex-1 text-center py-2 sm:py-3 text-sm sm:text-base">
                {formData.passengerCount}
              </span>
              <button
                type="button"
                onClick={() => handlePassengerCount("increment")}
                className="px-3 sm:px-4 py-2 sm:py-3 text-purple-600 hover:bg-gray-100 rounded-r-lg transition-colors"
                disabled={formData.passengerCount >= 4}
              >
                <FaPlus className="text-sm sm:text-base" />
              </button>
            </div>
          </div>

          {/* Calendar */}
          <div className="space-y-1 sm:space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Select Date
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.selectedDate.toLocaleDateString()}
                onClick={() => setShowCalendar(!showCalendar)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none cursor-pointer"
                readOnly
              />
              {showCalendar && (
                <div className="absolute z-50 mt-1 w-full sm:w-auto">
                  <Calendar
                    selectedDate={formData.selectedDate}
                    onChange={(date) => {
                      setFormData({ ...formData, selectedDate: date });
                      setShowCalendar(false);
                    }}
                    className="border border-gray-300 rounded-lg shadow-lg bg-white w-full sm:w-auto"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-[#412160] text-white py-3 rounded-lg font-semibold text-lg hover:bg-purple-800 transition-colors"
          >
            Search
          </button>
        </div>
        {/* Search History */}
        {searchHistory.length > 0 && (
          <div className="pt-4 sm:pt-6">
            <h3 className="text-base sm:text-lg font-medium text-gray-700 mb-2 sm:mb-3 flex items-center gap-2">
              <FaHistory className="text-purple-600" />
              Recent Searches
            </h3>
            <div className="space-y-2">
              {searchHistory.map((item, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleHistoryClick(item)}
                  className="w-full text-left p-2 sm:p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                    <div>
                      <span className="font-medium text-sm sm:text-base">
                        {item.leavingFrom}
                      </span>
                      <span className="mx-2">→</span>
                      <span className="font-medium text-sm sm:text-base">
                        {item.goingTo}
                      </span>
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500">
                      {new Date(item.selectedDate).toLocaleDateString()} ·{" "}
                      {item.passengerCount} passenger
                      {item.passengerCount > 1 ? "s" : ""}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchForm;
