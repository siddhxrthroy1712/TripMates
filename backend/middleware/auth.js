const jwt = require('jsonwebtoken');
const { User } = require('../models/User');

exports.auth = async (req, res, next) => {
    try {
        // Get token from cookie
        const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication token missing"
            });
        }

        try {
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Add user to request
            req.user = await User.findById(decoded._id);
            next();
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Invalid token"
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Authentication failed",
            error: error.message
        });
    }
};

// Role-based authorization middleware
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: "You do not have permission to perform this action"
            });
        }
        next();
    };
}; 