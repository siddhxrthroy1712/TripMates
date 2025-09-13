const { Client } = require('@googlemaps/google-maps-services-js');

const client = new Client({});

exports.calculateDistance = async (origin, destination) => {
    try {
        const response = await client.distancematrix({
            params: {
                origins: [origin],
                destinations: [destination],
                key: process.env.GOOGLE_MAPS_API_KEY,
            },
        });

        if (response.data.status !== 'OK') {
            throw new Error('Failed to calculate distance');
        }

        const result = response.data.rows[0].elements[0];
        
        return {
            distance: result.distance.text,
            distanceValue: result.distance.value, // in meters
            duration: result.duration.text,
            durationValue: result.duration.value, // in seconds
        };
    } catch (error) {
        console.error('Error calculating distance:', error);
        throw error;
    }
}; 