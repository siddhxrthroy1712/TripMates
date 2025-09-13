const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    otp: {
        type: String,
        required: true,
    },
    verified: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300, // OTP expires after 5 minutes
    },
});

// Ensure either email or phone number is provided
otpSchema.pre('save', function(next) {
    if (!this.email && !this.phoneNumber) {
        next(new Error('Either email or phone number must be provided'));
    }
    next();
});

module.exports = mongoose.model("OTP", otpSchema); 