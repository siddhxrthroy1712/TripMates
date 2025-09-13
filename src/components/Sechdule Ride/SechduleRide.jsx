// import React, { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { IoMenuOutline } from "react-icons/io5";
// import { MapPin } from "lucide-react";
// import MenuBar from "../Payment Menu/MenuBar";

// const ScheduleRide = () => {
//   const navigate = useNavigate();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [pickupLocation, setPickupLocation] = useState("");
//   const [dropLocation, setDropLocation] = useState("");
//   const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
//   const [time, setTime] = useState(
//     new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
//   );
//   const [selectedTransport, setSelectedTransport] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [isValid, setIsValid] = useState(false);
//   const [showPickupSuggestions, setShowPickupSuggestions] = useState(false);
//   const [showDropSuggestions, setShowDropSuggestions] = useState(false);
//   const [pickupSuggestions, setPickupSuggestions] = useState([]);
//   const [dropSuggestions, setDropSuggestions] = useState([]);

//   const handleLocationChange = (setter, value, suggestionsSetter) => {
//     setter(value);
//     suggestionsSetter([]); // Clear previous suggestions

//     // Mock suggestions (replace with your actual data or logic)
//     if (value.length > 2) {
//       const mockSuggestions = [
//         `${value} - Location 1`,
//         `${value} - Location 2`,
//         `${value} - Location 3`,
//         // ... more mock suggestions
//       ];
//       suggestionsSetter(mockSuggestions);
//     }
//   };

//   const handleSuggestionClick = (location, setter, suggestionsSetter) => {
//     setter(location);
//     suggestionsSetter([]);
//   };

//   const handleLocationClick = (setLocation) => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setLocation(
//             `Lat: ${latitude.toFixed(6)}, Lng: ${longitude.toFixed(6)}`
//           );
//           setErrorMessage("");
//         },
//         (error) => {
//           switch (error.code) {
//             case error.PERMISSION_DENIED:
//               setErrorMessage("Location access denied by the user.");
//               break;
//             case error.POSITION_UNAVAILABLE:
//               setErrorMessage("Location information is unavailable.");
//               break;
//             case error.TIMEOUT:
//               setErrorMessage("The request to get user location timed out.");
//               break;
//             default:
//               setErrorMessage("An unknown error occurred.");
//           }
//         }
//       );
//     } else {
//       setErrorMessage("Geolocation is not supported by this browser.");
//     }
//   };

//   useEffect(() => {
//     setIsValid(
//       pickupLocation && dropLocation && date && time && selectedTransport
//     );
//   }, [pickupLocation, dropLocation, date, time, selectedTransport]);

//   return (
//     <div>
//       {/* Navbar */}
//       <MenuBar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
//       <nav className="bg-purple-700 p-4 text-white flex items-center justify-between">
//         <IoMenuOutline
//           className="text-white text-2xl cursor-pointer"
//           onClick={() => setIsMenuOpen(true)}
//         />
//         <img src="src\assets\logo.png" alt="Logo" className="h-8" />
//       </nav>

//       <div className="p-6 max-w-md mx-auto border rounded-md shadow-md mt-8">
//         <h2 className="text-xl font-bold mb-4 text-purple-700 text-center">
//           Schedule Ride
//         </h2>

//         <LocationInput
//           placeholder="Pickup Location"
//           value={pickupLocation}
//           onChange={(e) =>
//             handleLocationChange(
//               setPickupLocation,
//               e.target.value,
//               setPickupSuggestions
//             )
//           }
//           onClick={() => handleLocationClick(setPickupLocation)}
//           suggestions={pickupSuggestions}
//           onSuggestionClick={(suggestion) =>
//             handleSuggestionClick(
//               suggestion,
//               setPickupLocation,
//               setPickupSuggestions
//             )
//           }
//           showSuggestions={showPickupSuggestions}
//           setShowSuggestions={setShowPickupSuggestions}
//         />

//         <LocationInput
//           placeholder="Drop Location"
//           value={dropLocation}
//           onChange={(e) =>
//             handleLocationChange(
//               setDropLocation,
//               e.target.value,
//               setDropSuggestions
//             )
//           }
//           suggestions={dropSuggestions}
//           onSuggestionClick={(suggestion) =>
//             handleSuggestionClick(
//               suggestion,
//               setDropLocation,
//               setDropSuggestions
//             )
//           }
//           showSuggestions={showDropSuggestions}
//           setShowSuggestions={setShowDropSuggestions}
//         />

//         <div className="grid grid-cols-2 gap-4 mb-4">
//           <div>
//             <label htmlFor="date" className="block font-medium text-gray-700">
//               Date
//             </label>
//             <input
//               type="date"
//               id="date"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//               className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div>
//             <label htmlFor="time" className="block font-medium text-gray-700">
//               Time
//             </label>
//             <input
//               type="time"
//               id="time"
//               value={time}
//               onChange={(e) => setTime(e.target.value)}
//               className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//         </div>

//         <div className="mb-4 border border-gray-300 rounded-md p-4 shadow-sm">
//           <h3 className="font-medium mb-2">Select Transport</h3>
//           <div className="flex space-x-4">
//             <TransportButton
//               icon="src\assets\vector.png"
//               label="Car"
//               isSelected={selectedTransport === "Car"}
//               onClick={() => setSelectedTransport("Car")}
//             />
//             <TransportButton
//               icon="src\assets\Bike(2).png"
//               label="Bike"
//               isSelected={selectedTransport === "Bike"}
//               onClick={() => setSelectedTransport("Bike")}
//             />
//           </div>
//           {selectedTransport && (
//             <p className="text-sm mt-2 text-blue-600">
//               Selected Transport: <strong>{selectedTransport}</strong>
//             </p>
//           )}
//         </div>

//         {errorMessage && (
//           <p className="text-red-500 mt-2 text-sm">{errorMessage}</p>
//         )}

//         <div className="mt-4 text-center">
//           <button
//             onClick={() =>
//               isValid &&
//               navigate("/Home", {
//                 state: {
//                   pickupLocation,
//                   dropLocation,
//                   date,
//                   time,
//                   selectedTransport,
//                 },
//               })
//             }
//             disabled={!isValid}
//             className={`${
//               isValid
//                 ? "bg-purple-700 hover:bg-purple-800 text-white"
//                 : "bg-gray-400 text-white cursor-not-allowed"
//             } rounded px-6 py-3 font-medium transition-colors duration-300`}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
// const LocationInput = ({
//   placeholder,
//   value,
//   onChange,
//   onClick,
//   suggestions,
//   onSuggestionClick,
//   showSuggestions,
//   setShowSuggestions,
// }) => (
//   <div className="mb-4 relative">
//     <div className="flex items-center space-x-2">
//       <div className="bg-gray-100 p-2 rounded-full">
//         <MapPin className="text-gray-600 w-6 h-6" />
//       </div>
//       <input
//         type="text"
//         placeholder={placeholder}
//         value={value}
//         onChange={onChange}
//         onClick={onClick}
//         className="flex-grow border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />
//       {value.length > 2 && suggestions.length > 0 && (
//         <ul className="absolute w-full bg-white border border-gray-300 rounded-md shadow-sm mt-1 z-10">
//           {suggestions.map((suggestion, index) => (
//             <li
//               key={index}
//               onClick={() => onSuggestionClick(suggestion)}
//               className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//             >
//               {suggestion}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   </div>
// );
// const TransportButton = ({ icon, label, isSelected, onClick }) => (
//   <button
//     onClick={onClick}
//     className={`border border-gray-300 rounded-md p-2 focus:outline-none hover:shadow-md ${
//       isSelected ? "bg-blue-100" : ""
//     }`}
//   >
//     <img src={icon} alt={label} className="w-16 h-16" />
//   </button>
// );

// export default ScheduleRide;

import React, { useState, useRef, useEffect } from "react";
import Calendar from "../Calendar";
import MenuBar from "../Payment Menu/MenuBar";
import { IoMenuOutline, IoLocationSharp } from "react-icons/io5";

const New = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [time, setTime] = useState("");
  const [price, setPrice] = useState(""); // Make sure price is a string
  const [transportType, setTransportType] = useState("car");
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const timePickerRef = useRef(null);
  const timeInputRef = useRef(null);

  const handleTimeClick = () => {
    setShowTimePicker(true);
  };

  const handleTimeSelect = (selectedTime) => {
    setTime(selectedTime);
    setShowTimePicker(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        timeInputRef.current &&
        !timeInputRef.current.contains(event.target) &&
        timePickerRef.current && // Check if timePickerRef is set
        !timePickerRef.current.contains(event.target) // Exclude clicks within TimePicker
      ) {
        setShowTimePicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [timeInputRef, timePickerRef]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const handlePickupChange = (e) => {
    setPickupLocation(e.target.value);
  };

  const handleDropChange = (e) => {
    setDropLocation(e.target.value);
  };

  const formattedDate = selectedDate
    ? new Date(selectedDate).toLocaleDateString()
    : "";

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });

          // Geocoding to get the address
          fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=YOUR_OPENCAGE_API_KEY` // Replace with your API key
          )
            .then((response) => response.json())
            .then((data) => {
              if (data.results && data.results.length > 0) {
                const formattedAddress = data.results[0].formatted;
                setPickupLocation(formattedAddress);
              } else {
                setPickupLocation("Location not found");
              }
            })
            .catch((error) => {
              console.error("Error getting address:", error);
              setPickupLocation("Error getting location");
            });
        },
        (error) => {
          console.error("Error getting location:", error);
          setPickupLocation("Location access denied or unavailable");
        }
      );
    } else {
      setPickupLocation("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="bg-purple-900 min-h-screen flex flex-col">
      <MenuBar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <nav className="bg-white p-4 text-purple-900 text-3xl flex items-center justify-between">
        <IoMenuOutline
          className="text-purple-900 text-4xl cursor-pointer"
          onClick={() => setIsMenuOpen(true)}
        />
        UNIGO!
        <img src="src\assets\logo.png" alt="Logo" className="h-12 w-12" />
      </nav>
      <div className="container mt-6 mb-9 mx-auto p-4 bg-white rounded-lg shadow-md flex-grow">
        <h2 className="text-2xl font-bold mb-4 text-center">Schedule Ride</h2>

        <div className="mb-4">
          <label htmlFor="pickup" className="block font-medium mb-1">
            Pick up location
          </label>
          <div className="flex">
            <input
              type="text"
              id="pickup"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter pickup location"
              value={pickupLocation} // Value is now controlled by state
              onChange={handlePickupChange} // Keep the onChange for manual input
            />
            <button
              type="button"
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-r-md focus:outline-none"
              onClick={handleGetCurrentLocation}
            >
              <IoLocationSharp className="text-xl" />
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="drop" className="block font-medium mb-1">
            Drop Location
          </label>
          <input
            type="text"
            id="drop"
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter drop location"
            value={dropLocation}
            onChange={handleDropChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="date" className="block font-medium mb-1">
            Date:
          </label>
          <div className="relative w-full">
            <input
              type="text"
              id="date"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Select date"
              value={formattedDate}
              onClick={() => setShowCalendar(true)}
              readOnly
            />
            {showCalendar && (
              <div className="absolute left-0 top-full z-50 bg-white rounded-lg shadow-lg p-4">
                <Calendar
                  selectedDate={selectedDate}
                  onDateSelect={handleDateSelect}
                  onClose={() => setShowCalendar(false)}
                />
              </div>
            )}
          </div>
        </div>

        <div className="mb-4 relative">
          <label htmlFor="time" className="block font-medium mb-1">
            Time:
          </label>
          <input
            type="text"
            id="time"
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={time}
            onClick={handleTimeClick}
            readOnly
            ref={timeInputRef}
          />
          {showTimePicker && (
            <div className="absolute left-0 top-full z-50" ref={timePickerRef}>
              {" "}
              {/* Ref added here */}
              <TimePicker
                onTimeSelect={handleTimeSelect}
                onClose={() => setShowTimePicker(false)}
              />
            </div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block font-medium mb-1">
            Price:
          </label>
          <input
            type="text"
            id="price"
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">
            Select your transport
          </label>
          <div className="flex space-x-4">
            <button
              className={`px-4 py-2 rounded-md ${
                transportType === "car"
                  ? "bg-purple-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => setTransportType("car")}
            >
              Car
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                transportType === "bike"
                  ? "bg-purple-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => setTransportType("bike")}
            >
              Bike
            </button>
          </div>
        </div>

        <button className="w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-200">
          Next
        </button>
      </div>
    </div>
  );
};
const TimePicker = ({ onTimeSelect, onClose, initialTime }) => {
  const [selectedHour, setSelectedHour] = useState(
    initialTime ? parseInt(initialTime.split(":")[0]) : new Date().getHours()
  );
  const [selectedMinute, setSelectedMinute] = useState(
    initialTime ? parseInt(initialTime.split(":")[1]) : new Date().getMinutes()
  );

  const handleHourChange = (e) => {
    setSelectedHour(parseInt(e.target.value, 10));
  };

  const handleMinuteChange = (e) => {
    setSelectedMinute(parseInt(e.target.value, 10));
  };

  const handleSelect = () => {
    const formattedTime = `${String(selectedHour).padStart(2, "0")}:${String(
      selectedMinute
    ).padStart(2, "0")}`;
    onTimeSelect(formattedTime);
    onClose();
  };

  return (
    <div className="absolute left-0 top-full z-50 bg-white rounded-lg shadow-lg p-4">
      {/* ... TimePicker JSX (no changes needed) */}
      <div className="flex items-center">
        <label htmlFor="hour">Hour:</label>
        <input
          type="number"
          id="hour"
          min="0"
          max="23"
          value={selectedHour}
          onChange={handleHourChange}
          className="w-16 border border-gray-300 px-2 py-1 rounded-md mr-2"
        />

        <label htmlFor="minute">Minute:</label>
        <input
          type="number"
          id="minute"
          min="0"
          max="59"
          value={selectedMinute}
          onChange={handleMinuteChange}
          className="w-16 border border-gray-300 px-2 py-1 rounded-md"
        />
      </div>
      <div className="mt-2 flex justify-end">
        <button
          onClick={handleSelect}
          className="bg-purple-500 text-white py-1 px-3 rounded-md mr-2"
        >
          Select
        </button>
        <button
          onClick={onClose}
          className="border border-gray-300 py-1 px-3 rounded-md"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
export default New;
