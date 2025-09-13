const { User } = require("../../models/User");

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide both email and password"
            });
        }

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        // Verify password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid password"
            });
        }

        // Generate token
        const token = user.generateAuthToken();

        // Set cookie with proper settings for cross-domain requests
        const options = {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Only use HTTPS in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax' // Allow cross-site cookies in production
        };

        // // Additional driver-specific data
        // const userData = {
        //     _id: user._id,
        //     fullName: user.fullName,
        //     email: user.email,
        //     phoneNumber: user.phoneNumber,
        //     role: user.role,
        //     isVerified: user.isVerified
        // };

        // // If user is a driver, include additional info
        // if (user.role === 'driver') {
        //     userData.isAvailable = user.isAvailable || false;
        //     userData.currentLocation = user.currentLocation || null;
        //     userData.vehicleDetails = user.vehicleDetails || null;
        // }

        return res.cookie("token", token, options).status(200).json({
            success: true,
            message: "Logged in successfully",
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
        console.error("Error in login:", error);
        return res.status(500).json({
            success: false,
            message: "Login failed",
            error: error.message
        });
    }
};