const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    state: {
        type: String,
        trim: true,
    },
    city: {
        type: String,
        trim: true,
    },
    role: {
        type: String,
        enum: ["PASSENGER", "DRIVER", "ADMIN"],
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true, discriminatorKey: 'role' });

// Password hashing middleware
userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// JWT token generation
userSchema.methods.generateAuthToken = function() {
    return jwt.sign(
        { _id: this._id, role: this.role },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
    );
};

// Password comparison
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.models.User || mongoose.model("User", userSchema);

// Log available discriminators
console.log("Available discriminators:", User.discriminators);

// Passenger discriminator
const passengerSchema = new mongoose.Schema({
    course: {
        type: String,
        required: true,
    },
});

const Passenger = User.discriminator("PASSENGER", passengerSchema);

// Driver discriminator
const driverSchema = new mongoose.Schema({
    drivingLicense: {
        type: String,
        required: true,
    },
    drivingLicenseId: {
        type: String,
    },
    profilePhoto: {
        type: String,
        required: true,
    },
    profilePhotoId: {
        type: String,
    },
    universityIdCard: {
        type: String,
        required: true,
    },
    universityIdCardId: {
        type: String,
    },
});

const Driver = User.discriminator("DRIVER", driverSchema);

// Admin discriminator
const adminSchema = new mongoose.Schema({});
const Admin = User.discriminator("ADMIN", adminSchema);

module.exports = { User, Passenger, Driver, Admin }; 