const { RideRequest } = require("../../models/RideRequest");
const { User } = require("../../models/User");

exports.createRideRequest = async (req, res) => {
    try {
        const { pickupLocation, dropLocation, passengerId } = req.body;

        // Validate locations
        if (!pickupLocation?.latitude || !pickupLocation?.longitude || 
            !dropLocation?.latitude || !dropLocation?.longitude) {
            return res.status(400).json({
                success: false,
                message: "Invalid location coordinates"
            });
        }

        // Calculate estimated fare based on distance
        const distance = calculateDistance(
            pickupLocation.latitude,
            pickupLocation.longitude,
            dropLocation.latitude,
            dropLocation.longitude
        );
        const estimatedFare = calculateFare(distance);

        const rideRequest = new RideRequest({
            passengerId,
            pickupLocation,
            dropLocation,
            status: 'pending',
            estimatedFare,
            distance,
            createdAt: new Date(),
            expiresAt: new Date(Date.now() + 5 * 60000) // Request expires in 5 minutes
        });

        await rideRequest.save();

        // Find nearby drivers (within 5km radius)
        const nearbyDrivers = await User.find({
            role: 'driver',
            isAvailable: true,
            currentLocation: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [pickupLocation.longitude, pickupLocation.latitude]
                    },
                    $maxDistance: 5000
                }
            }
        }).limit(5);

        if (nearbyDrivers.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No drivers available nearby"
            });
        }

        // Broadcast ride request to nearby drivers
        // Implement your real-time notification system here

        return res.status(201).json({
            success: true,
            message: "Ride request created successfully",
            rideRequest,
            estimatedFare,
            distance
        });
    } catch (error) {
        console.error("Error in createRideRequest:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create ride request",
            error: error.message
        });
    }
};

exports.handleRideResponse = async (req, res) => {
    try {
        const { rideRequestId, driverId, action } = req.body;

        const rideRequest = await RideRequest.findById(rideRequestId);
        if (!rideRequest) {
            return res.status(404).json({
                success: false,
                message: "Ride request not found"
            });
        }

        // Check if request hasn't expired
        if (new Date() > new Date(rideRequest.expiresAt)) {
            rideRequest.status = 'expired';
            await rideRequest.save();
            return res.status(400).json({
                success: false,
                message: "Ride request has expired"
            });
        }

        if (action === 'accept') {
            rideRequest.status = 'accepted';
            rideRequest.driverId = driverId;
            await rideRequest.save();

            // Update driver availability
            await User.findByIdAndUpdate(driverId, { isAvailable: false });

            // Notify passenger about acceptance
            // Implement your real-time notification system here
        } else if (action === 'decline') {
            // Mark this driver as declined for this request
            if (!rideRequest.declinedBy) rideRequest.declinedBy = [];
            rideRequest.declinedBy.push(driverId);

            // Find next nearest driver who hasn't declined
            const nextDriver = await User.findOne({
                role: 'driver',
                isAvailable: true,
                _id: { $nin: rideRequest.declinedBy },
                currentLocation: {
                    $near: {
                        $geometry: {
                            type: "Point",
                            coordinates: [rideRequest.pickupLocation.longitude, rideRequest.pickupLocation.latitude]
                        },
                        $maxDistance: 5000
                    }
                }
            });

            if (!nextDriver) {
                rideRequest.status = 'cancelled';
                await rideRequest.save();
                return res.status(404).json({
                    success: false,
                    message: "No more available drivers nearby"
                });
            }

            await rideRequest.save();
            // Notify next driver about the request
            // Implement your real-time notification system here
        }

        return res.status(200).json({
            success: true,
            message: `Ride ${action}ed successfully`,
            rideRequest
        });
    } catch (error) {
        console.error("Error in handleRideResponse:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to handle ride response",
            error: error.message
        });
    }
};

// Helper function to calculate distance using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
              Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

function toRad(value) {
    return value * Math.PI / 180;
}

function calculateFare(distance) {
    const basePrice = 50; // Base fare in your currency
    const pricePerKm = 15; // Price per kilometer
    return basePrice + (distance * pricePerKm);
}