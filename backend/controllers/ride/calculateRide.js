const { calculateDistance } = require('../../utils/googleMaps');

exports.calculateRide = async (req, res) => {
    try {
        const { pickup, dropoff } = req.body;

        // Validate input
        if (!pickup || !dropoff) {
            return res.status(400).json({
                success: false,
                message: "Both pickup and dropoff locations are required"
            });
        }

        // Calculate distance and duration
        const routeInfo = await calculateDistance(pickup, dropoff);

        // Calculate estimated fare (example: ₹15 base + ₹12 per km)
        const baseRate = 15;
        const ratePerKm = 12;
        const distanceInKm = routeInfo.distanceValue / 1000;
        const estimatedFare = baseRate + (distanceInKm * ratePerKm);

        return res.status(200).json({
            success: true,
            data: {
                distance: routeInfo.distance,
                duration: routeInfo.duration,
                estimatedFare: Math.round(estimatedFare),
                route: {
                    pickup,
                    dropoff
                }
            }
        });

    } catch (error) {
        console.error("Error calculating ride:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to calculate ride details",
            error: error.message
        });
    }
}; 