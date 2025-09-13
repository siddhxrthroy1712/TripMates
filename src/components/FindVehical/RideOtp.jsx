import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaShare, FaPhoneAlt, FaClock, FaRoad } from "react-icons/fa";
import L from "leaflet";

const RideOTP = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [routeInfo, setRouteInfo] = useState({
    duration: 7200, // 2 hours in seconds
    distance: 71000, // 71 km in meters
  });
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);

  const {
    driverData = {
      name: "Driver Name",
      vehicleName: "Super Bike",
      vehicleModel: "Ducati Panigale V4 | 2018",
      phone: "9874563210",
    },
    fromLocation = "Roorkee",
    toLocation = "Dehradun",
    fromCoordinates = "29.8543,77.8880",
    toCoordinates = "30.3165,78.0322",
  } = location.state || {};

  // Parse coordinates
  const [fromLat, fromLng] = fromCoordinates
    .split(",")
    .map((coord) => parseFloat(coord));
  const [toLat, toLng] = toCoordinates
    .split(",")
    .map((coord) => parseFloat(coord));

  // Helper function to format duration
  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours} hr ${minutes} min`;
    }
    return `${minutes} min`;
  };

  // Helper function to format distance
  const formatDistance = (meters) => {
    const kilometers = (meters / 1000).toFixed(1);
    return `${kilometers} km`;
  };

  useEffect(() => {
    const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setOtp(generatedOtp);

    // Initialize map
    if (!mapRef.current && mapContainerRef.current) {
      mapRef.current = L.map(mapContainerRef.current).setView(
        [(fromLat + toLat) / 2, (fromLng + toLng) / 2],
        9
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(mapRef.current);

      // Custom marker icons
      const createCustomMarker = (label) => {
        return L.divIcon({
          className: "custom-div-icon",
          html: `
            <div style="
              background-color: #412160;
              color: white;
              width: 24px;
              height: 24px;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 50%;
              border: 2px solid white;
              box-shadow: 0 2px 5px rgba(0,0,0,0.2);
              font-weight: bold;
              font-size: 12px;
            ">${label}</div>
          `,
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        });
      };

      // Add start and finish markers
      L.marker([fromLat, fromLng], {
        icon: createCustomMarker("S"),
      })
        .addTo(mapRef.current)
        .bindPopup(fromLocation);

      L.marker([toLat, toLng], {
        icon: createCustomMarker("F"),
      })
        .addTo(mapRef.current)
        .bindPopup(toLocation);

      // Fetch route from OSRM
      fetch(
        `https://router.project-osrm.org/route/v1/driving/${fromLng},${fromLat};${toLng},${toLat}?overview=full&geometries=geojson`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.routes && data.routes[0]) {
            const route = data.routes[0];
            const coordinates = route.geometry.coordinates.map((coord) => [
              coord[1],
              coord[0],
            ]);

            // Draw the route line
            L.polyline(coordinates, {
              color: "#412160",
              weight: 4,
              opacity: 0.8,
              lineJoin: "round",
            }).addTo(mapRef.current);

            // Update route info if needed
            setRouteInfo({
              duration: route.duration,
              distance: route.distance,
            });

            // Fit bounds to show the entire route
            mapRef.current.fitBounds(coordinates, { padding: [50, 50] });
          }
        })
        .catch((error) => {
          console.error("Error fetching route:", error);
          // Fallback to straight line if route fetch fails
          L.polyline(
            [
              [fromLat, fromLng],
              [toLat, toLng],
            ],
            {
              color: "#412160",
              weight: 4,
              opacity: 0.8,
              dashArray: "10, 10",
            }
          ).addTo(mapRef.current);
        });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [fromLat, fromLng, toLat, toLng, fromLocation, toLocation]);

  const handleShare = async () => {
    try {
      await navigator.share({
        title: "My Ride Details",
        text: `My ride OTP is ${otp}. Driver: ${driverData.name}, Vehicle: ${driverData.vehicleName}. From: ${fromLocation} To: ${toLocation}`,
      });
    } catch (err) {
      console.log("Share failed:", err);
    }
  };

  const handleCall = () => {
    window.location.href = `tel:${driverData.phone}`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Map Section */}
      <div className="h-[40vh] relative bg-gray-200 z-0">
        <div ref={mapContainerRef} style={{ height: "100%", width: "100%" }} />
      </div>

      {/* Driver Details Card */}
      <div className="bg-white rounded-t-3xl -mt-6 relative z-10 flex-1 p-6">
        {/* Route Information */}
        <div className="mb-4 bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
              <p className="text-gray-700">From: {fromLocation}, Uttarakhand</p>
            </div>
            <div className="flex items-center gap-2 text-purple-600">
              <FaClock />
              <span>{formatDuration(routeInfo.duration)}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
              <p className="text-gray-700">To: {toLocation}, Uttarakhand</p>
            </div>
            <div className="flex items-center gap-2 text-purple-600">
              <FaRoad />
              <span>{formatDistance(routeInfo.distance)}</span>
            </div>
          </div>
        </div>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="mb-4 flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-full hover:bg-purple-100 transition-colors"
        >
          <FaShare className="text-[#412160] text-sm" />
          <span className="text-[#412160] text-sm font-medium">
            Share ride details
          </span>
        </button>

        {/* Driver Info */}
        <div className="flex items-center gap-4 border-b pb-4">
          <div className="w-16 h-16 bg-[#412160] rounded-full flex items-center justify-center">
            <span className="text-white text-2xl">
              {driverData.name?.charAt(0)}
            </span>
          </div>
          <div>
            <h2 className="text-xl font-semibold">{driverData.name}</h2>
            <p className="text-gray-600">{driverData.vehicleName}</p>
            <p className="text-sm text-gray-500">{driverData.vehicleModel}</p>
          </div>
        </div>

        {/* Contact Number */}
        <button
          onClick={handleCall}
          className="mt-4 flex items-center gap-3 w-full bg-purple-50 p-3 rounded-lg hover:bg-purple-100 transition-colors"
        >
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
            <FaPhoneAlt className="text-[#412160]" />
          </div>
          <span className="text-lg font-medium text-[#412160]">
            {driverData.phone}
          </span>
          <span className="text-sm text-gray-500 ml-2">(Tap to call)</span>
        </button>

        {/* OTP Display */}
        <div className="mt-6">
          <div className="bg-gray-100 p-6 rounded-lg text-center">
            <h3 className="text-lg font-medium mb-2">
              Share this OTP with driver
            </h3>
            <p className="text-4xl font-bold tracking-wider text-[#412160]">
              {otp}
            </p>
          </div>

          <button
            onClick={() =>
              navigate("/ride-in-progress", {
                state: {
                  driverData,
                  fromLocation,
                  toLocation,
                  fromCoordinates,
                  toCoordinates,
                  routeInfo,
                },
              })
            }
            className="w-full bg-[#412160] text-white py-4 rounded-lg font-semibold text-lg mt-6"
          >
            Start Ride
          </button>
        </div>
      </div>
    </div>
  );
};

export default RideOTP;
