const express = require('express');
const router = express.Router();
const { auth, authorize } = require('../middleware/auth');
const { uploadDriverDocs } = require('../middleware/fileUpload');
const { 
    updateProfile, 
    getAllProfiles,
    getProfile,
    deleteProfile 
} = require('../controllers/profile/updateProfile');

// Protected routes
router.get('/all', auth, authorize("ADMIN"), getAllProfiles); // Only admin can see all profiles
router.get('/:id?', auth, getProfile); // Get single profile (own or specific ID)
router.put('/update', auth, updateProfile);
router.put('/update-driver-docs', auth, authorize("DRIVER"), uploadDriverDocs, updateProfile);
router.delete('/:id?', auth, deleteProfile); // Delete profile (own or specific ID)

module.exports = router; 