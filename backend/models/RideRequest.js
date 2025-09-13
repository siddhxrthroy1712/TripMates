const mongoose = require('mongoose');

const rideRequestSchema = new mongoose.Schema({
    
    passengerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    driverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    pickupLocation: {
        type: {
            latitude: Number,
            longitude: Number,
            address: String
        },
        required: true
    },
    dropLocation: {
        type: {
            latitude: Number,
            longitude: Number,
            address: String
        },
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'declined', 'completed', 'cancelled'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

exports.RideRequest = mongoose.model('RideRequest', rideRequestSchema);