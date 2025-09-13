import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaPhoneAlt, FaClock, FaRoad } from "react-icons/fa";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const RideInProgress = () => {
  const location = useLocation();
  const navigate = useNavigate();
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
    routeInfo = {
      duration: 7200,
      distance: 71000,
    },
  } = location.state || {};

  // Parse coordinates
  const [fromLat, fromLng] = fromCoordinates
    .split(",")
    .map((coord) => parseFloat(coord));
  const [toLat, toLng] = toCoordinates
    .split(",")
    .map((coord) => parseFloat(coord));

  // Helper functions
  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours} hr ${minutes} min`;
    }
    return `${minutes} min`;
  };

  const formatDistance = (meters) => {
    const kilometers = (meters / 1000).toFixed(1);
    return `${kilometers} km`;
  };

  const handleCall = () => {
    window.location.href = `tel:${driverData.phone}`;
  };

  const handleEndRide = () => {
    navigate("/payment-complete", {
      state: {
        amount: 50,
        timestamp: new Date().toLocaleString(),
      },
    });
  };

  useEffect(() => {
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

      // Add markers and route
      L.marker([fromLat, fromLng], { icon: createCustomMarker("S") })
        .addTo(mapRef.current)
        .bindPopup(fromLocation);

      L.marker([toLat, toLng], { icon: createCustomMarker("F") })
        .addTo(mapRef.current)
        .bindPopup(toLocation);

      // Fetch and draw route
      fetch(
        `https://router.project-osrm.org/route/v1/driving/${fromLng},${fromLat};${toLng},${toLat}?overview=full&geometries=geojson`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.routes && data.routes[0]) {
            const coordinates = data.routes[0].geometry.coordinates.map(
              (coord) => [coord[1], coord[0]]
            );
            L.polyline(coordinates, {
              color: "#412160",
              weight: 4,
              opacity: 0.8,
              lineJoin: "round",
            }).addTo(mapRef.current);
            mapRef.current.fitBounds(coordinates, { padding: [50, 50] });
          }
        })
        .catch((error) => {
          console.error("Error fetching route:", error);
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

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Map Section */}
      <div className="h-[40vh] relative bg-gray-200 z-0">
        <div ref={mapContainerRef} className="h-full w-full" />
      </div>

      {/* Ride Details */}
      <div className="bg-white rounded-t-3xl -mt-6 relative z-10 flex-1 p-6">
        {/* Status */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-semibold text-purple-900">
            Ride in Progress
          </h2>
          <p className="text-gray-600 mt-2">
            You're on your way to the destination
          </p>
        </div>

        {/* Route Information */}
        <div className="mb-6 bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
              <p className="text-gray-700">{fromLocation}</p>
            </div>
            <div className="flex items-center gap-2 text-purple-600">
              <FaClock />
              <span>{formatDuration(routeInfo.duration)}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
              <p className="text-gray-700">{toLocation}</p>
            </div>
            <div className="flex items-center gap-2 text-purple-600">
              <FaRoad />
              <span>{formatDistance(routeInfo.distance)}</span>
            </div>
          </div>
        </div>

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

        {/* Contact Button */}
        <button
          onClick={handleCall}
          className="mt-6 flex items-center gap-3 w-full bg-purple-50 p-3 rounded-lg hover:bg-purple-100 transition-colors"
        >
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
            <FaPhoneAlt className="text-[#412160]" />
          </div>
          <span className="text-lg font-medium text-[#412160]">
            {driverData.phone}
          </span>
          <span className="text-sm text-gray-500 ml-2">(Tap to call)</span>
        </button>

        {/* End Ride Button */}
        <button
          onClick={handleEndRide}
          className="mt-4 w-full bg-[#412160] text-white py-4 rounded-lg font-semibold hover:bg-purple-900 transition-colors"
        >
          End Ride
        </button>
      </div>
    </div>
  );
};

export default RideInProgress;
