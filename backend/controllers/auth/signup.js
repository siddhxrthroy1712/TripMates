const { User, Passenger, Driver } = require("../../models/User");
const OTP = require("../../models/OTP");
const jwt = require("jsonwebtoken");
const cloudinary = require('cloudinary').v2;

exports.signup = async (req, res) => {
    try {
        const {
            fullName,
            email,
            password,
            confirmPassword,
            phoneNumber,
            dateOfBirth,
            role,
            state,
            city,
        } = req.body;

        // Basic validation
        if (!fullName || !email || !password || !confirmPassword || !phoneNumber || !dateOfBirth || !role || !state || !city) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be provided"
            });
        }

        // Password validation
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match"
            });
        }

        // Check existing user
        const existingUser = await User.findOne({
            $or: [
                { email: email.toLowerCase() },
                { phoneNumber }
            ]
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: `User already exists with this ${existingUser.email === email.toLowerCase() ? 'email' : 'phone number'}`
            });
        }

        // Verify OTP
        const verifiedOTP = await OTP.findOne({
            $or: [
                { email: email.toLowerCase(), verified: true },
                { phoneNumber, verified: true }
            ]
        }).sort({ createdAt: -1 });

        if (!verifiedOTP) {
            return res.status(403).json({
                success: false,
                message: "Please verify your email/phone number first"
            });
        }

        let user;
        if (role === "DRIVER") {
            // Check if all required files are present
            if (!req.files || !req.files.drivingLicense || !req.files.profilePhoto || !req.files.universityIdCard) {
                return res.status(400).json({
                    success: false,
                    message: "All driver documents (driving license, profile photo, and university ID) are required"
                });
            }

            try {
                // Upload files to Cloudinary
                const drivingLicenseResult = await cloudinary.uploader.upload(
                    req.files.drivingLicense.tempFilePath,
                    { folder: "unigo/licenses" }
                );

                const profilePhotoResult = await cloudinary.uploader.upload(
                    req.files.profilePhoto.tempFilePath,
                    { folder: "unigo/profile" }
                );

                const universityIdResult = await cloudinary.uploader.upload(
                    req.files.universityIdCard.tempFilePath,
                    { folder: "unigo/university" }
                );

                // Create driver with uploaded URLs
                user = await Driver.create({
                    fullName,
                    email: email.toLowerCase(),
                    password,
                    phoneNumber,
                    dateOfBirth,
                    role,
                    drivingLicense: drivingLicenseResult.secure_url,
                    drivingLicenseId: drivingLicenseResult.public_id,
                    profilePhoto: profilePhotoResult.secure_url,
                    profilePhotoId: profilePhotoResult.public_id,
                    universityIdCard: universityIdResult.secure_url,
                    universityIdCardId: universityIdResult.public_id,
                    isVerified: true
                });
            } catch (error) {
                console.error("File upload error:", error);
                return res.status(400).json({
                    success: false,
                    message: "Error uploading files",
                    error: error.message
                });
            }
        } else if (role === "PASSENGER") {
            // Handle passenger signup
            const { course } = req.body;
            if (!course) {
                return res.status(400).json({
                    success: false,
                    message: "Course is required for passengers"
                });
            }
            user = await Passenger.create({
                fullName,
                email: email.toLowerCase(),
                password,
                phoneNumber,
                dateOfBirth,
                role,
                course,
                isVerified: true
            });
        } else if (role === "ADMIN") {
            user = await User.create({
                fullName,
                email: email.toLowerCase(),
                password,
                phoneNumber,
                dateOfBirth,
                role,
                state,
                city,
                isVerified: true
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Invalid role specified"
            });
        }

        // Delete the verified OTP
        await OTP.deleteOne({ _id: verifiedOTP._id });

        // Generate token
        const token = user.generateAuthToken();

        // Set cookie with proper settings for cross-domain requests
        const options = {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Only use HTTPS in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax' // Allow cross-site cookies in production
        };

        return res.cookie("token", token, options).status(200).json({
            success: true,
            message: "User registered successfully",
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
                isVerified: user.isVerified
            }
        });

    } catch (error) {
        console.error("Error in signup:", error);
        return res.status(500).json({
            success: false,
            message: "User registration failed",
            error: error.message
        });
    }
};