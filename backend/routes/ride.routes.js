const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { calculateRide } = require('../controllers/ride/calculateRide');
const { createRideRequest, handleRideResponse } = require('../controllers/ride/rideRequest');

// Protected routes
router.post('/calculate', auth, calculateRide);

// Ride request routes
router.post('/request', auth, createRideRequest);
router.post('/response', auth, handleRideResponse);

module.exports = router; 