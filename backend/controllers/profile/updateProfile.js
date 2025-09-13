const { User, Passenger, Driver } = require('../../models/User');
const { deleteDriverDocs } = require('../../middleware/fileUpload');
const cloudinary = require('cloudinary').v2;

exports.updateProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const {
            fullName,
            phoneNumber,
            dateOfBirth,
            state,
            city,
            // Passenger specific
            course,
            // Driver specific
            drivingLicense
        } = req.body;

        // Find user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Update basic fields
        const updateFields = {
            ...(fullName && { fullName }),
            ...(phoneNumber && { phoneNumber }),
            ...(dateOfBirth && { dateOfBirth }),
            ...(state && { state }),
            ...(city && { city })
        };

        // Handle profile photo update
        if (req.files && req.files.profilePhoto) {
            try {
                // If user is a driver and already has a profile photo, delete the old one
                if (user.role === "DRIVER" && user.profilePhotoId) {
                    await cloudinary.uploader.destroy(user.profilePhotoId);
                }

                // Upload new profile photo
                const profilePhotoResult = await cloudinary.uploader.upload(
                    req.files.profilePhoto.tempFilePath,
                    { folder: "unigo/profile" }
                );

                updateFields.profilePhoto = profilePhotoResult.secure_url;
                updateFields.profilePhotoId = profilePhotoResult.public_id;
            } catch (error) {
                console.error("Profile photo upload error:", error);
                return res.status(400).json({
                    success: false,
                    message: "Error uploading profile photo",
                    error: error.message
                });
            }
        }

        // Handle role-specific updates
        if (user.role === "PASSENGER" && course) {
            updateFields.course = course;
        } else if (user.role === "DRIVER") {
            // Handle driver document updates
            if (req.files) {
                try {
                    if (req.files.drivingLicense) {
                        // Delete old driving license if it exists
                        if (user.drivingLicenseId) {
                            await cloudinary.uploader.destroy(user.drivingLicenseId);
                        }
                        const drivingLicenseResult = await cloudinary.uploader.upload(
                            req.files.drivingLicense.tempFilePath,
                            { folder: "unigo/licenses" }
                        );
                        updateFields.drivingLicense = drivingLicenseResult.secure_url;
                        updateFields.drivingLicenseId = drivingLicenseResult.public_id;
                    }

                    if (req.files.universityIdCard) {
                        // Delete old university ID if it exists
                        if (user.universityIdCardId) {
                            await cloudinary.uploader.destroy(user.universityIdCardId);
                        }
                        const universityIdResult = await cloudinary.uploader.upload(
                            req.files.universityIdCard.tempFilePath,
                            { folder: "unigo/university" }
                        );
                        updateFields.universityIdCard = universityIdResult.secure_url;
                        updateFields.universityIdCardId = universityIdResult.public_id;
                    }
                } catch (error) {
                    console.error("Document upload error:", error);
                    return res.status(400).json({
                        success: false,
                        message: "Error uploading documents",
                        error: error.message
                    });
                }
            }
        }

        // Update user
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updateFields },
            { new: true }
        ).select('-password');

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: updatedUser
        });

    } catch (error) {
        console.error("Error in profile update:", error);
        return res.status(500).json({
            success: false,
            message: "Profile update failed",
            error: error.message
        });
    }
};

// Get all profiles (with optional role filter)
exports.getAllProfiles = async (req, res) => {
    try {
        const { role } = req.query;
        let query = {};
        
        // If role is specified, filter by role
        if (role) {
            query.role = role.toUpperCase();
        }

        const users = await User.find(query).select('-password');

        return res.status(200).json({
            success: true,
            count: users.length,
            users: users
        });
    } catch (error) {
        console.error("Error fetching profiles:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching profiles",
            error: error.message
        });
    }
};

// Get single profile
exports.getProfile = async (req, res) => {
    try {
        const userId = req.params.id || req.user._id;
        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        console.error("Error fetching profile:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching profile",
            error: error.message
        });
    }
};

// Delete profile
exports.deleteProfile = async (req, res) => {
    try {
        const userId = req.params.id || req.user._id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // If user is a driver, delete their documents from Cloudinary
        if (user.role === "DRIVER") {
            const publicIds = [
                user.drivingLicenseId,
                user.profilePhotoId,
                user.universityIdCardId
            ].filter(id => id); // Filter out any null/undefined IDs

            if (publicIds.length > 0) {
                await deleteDriverDocs(publicIds);
            }
        }

        // Delete user from database
        await User.findByIdAndDelete(userId);

        // Clear the auth cookie
        res.clearCookie('token');

        return res.status(200).json({
            success: true,
            message: "Profile deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting profile:", error);
        return res.status(500).json({
            success: false,
            message: "Error deleting profile",
            error: error.message
        });
    }
}; 