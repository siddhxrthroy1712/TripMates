const cloudinary = require('cloudinary').v2;

// Upload file to cloudinary
const uploadToCloudinary = async (file, folder) => {
    try {
        if (!file) return null;
        
        // Upload file to cloudinary
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            folder,
        });
        
        return {
            public_id: result.public_id,
            secure_url: result.secure_url,
        };
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        throw error;
    }
};

// Delete file from cloudinary
const deleteFromCloudinary = async (public_id) => {
    try {
        if (!public_id) return null;
        const result = await cloudinary.uploader.destroy(public_id);
        return result;
    } catch (error) {
        console.error("Error deleting from Cloudinary:", error);
        throw error;
    }
};

exports.uploadDriverDocs = async (req, res, next) => {
    try {
        const files = req.files;
        const uploadResults = {};

        if (!files) {
            return res.status(400).json({
                success: false,
                message: "No files were uploaded"
            });
        }

        // Upload profile photo
        if (files.profilePhoto) {
            const result = await uploadToCloudinary(
                files.profilePhoto[0],
                "unigo/profile"
            );
            uploadResults.profilePhoto = result.secure_url;
            uploadResults.profilePhotoId = result.public_id;
        }

        // Upload driving license
        if (files.drivingLicense) {
            const result = await uploadToCloudinary(
                files.drivingLicense[0],
                "unigo/licenses"
            );
            uploadResults.drivingLicense = result.secure_url;
            uploadResults.drivingLicenseId = result.public_id;
        }

        // Upload university ID card
        if (files.universityIdCard) {
            const result = await uploadToCloudinary(
                files.universityIdCard[0],
                "unigo/university"
            );
            uploadResults.universityIdCard = result.secure_url;
            uploadResults.universityIdCardId = result.public_id;
        }

        // Add upload results to request
        req.uploadResults = uploadResults;
        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error uploading files",
            error: error.message
        });
    }
};

exports.deleteDriverDocs = async (publicIds) => {
    try {
        if (!publicIds || !publicIds.length) return;
        
        const deletePromises = publicIds.map(id => deleteFromCloudinary(id));
        await Promise.all(deletePromises);
        
    } catch (error) {
        console.error("Error deleting files:", error);
        throw error;
    }
}; 