const { User } = require('../../models/User');
const admin = require('../../config/firebase');

exports.socialLogin = async (req, res) => {
    try {
        const { idToken, provider } = req.body;

        if (!idToken) {
            return res.status(400).json({
                success: false,
                message: "ID Token is required"
            });
        }

        // Verify the Firebase ID token
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        
        // Extract user info from decoded token
        let email, fullName, profilePhoto;

        if (provider === 'facebook.com') {
            // Facebook specific data extraction
            email = decodedToken.firebase.identities['facebook.com'][0];
            fullName = decodedToken.name || '';
            profilePhoto = decodedToken.picture || '';
        } else {
            // Google or default extraction
            email = decodedToken.email;
            fullName = decodedToken.name;
            profilePhoto = decodedToken.picture;
        }

        // Check if user exists
        let user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "No account exists with this email. Please sign up first."
            });
        }

        // Generate JWT token
        const token = user.generateAuthToken();

        // Set cookie
        const options = {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            httpOnly: true
        };

        return res.cookie("token", token, options).status(200).json({
            success: true,
            message: "Login successful",
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
                isVerified: user.isVerified,
                provider: provider
            }
        });

    } catch (error) {
        console.error("Social login error:", error);
        return res.status(500).json({
            success: false,
            message: "Social login failed",
            error: error.message
        });
    }
}; 