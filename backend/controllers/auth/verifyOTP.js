const OTP = require("../../models/OTP");

exports.verifyOTP = async (req, res) => {
    try {
        const { email, phoneNumber, otp } = req.body;

        if (!otp) {
            return res.status(400).json({
                success: false,
                message: "Please provide the OTP"
            });
        }

        // Find the most recent OTP for the email/phone
        const recentOTP = await OTP.findOne({
            ...(email ? { email } : { phoneNumber }),
        }).sort({ createdAt: -1 });

        if (!recentOTP) {
            return res.status(400).json({
                success: false,
                message: "OTP not found"
            });
        }

        if (recentOTP.otp !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }

        // Mark OTP as verified
        recentOTP.verified = true;
        await recentOTP.save();

        return res.status(200).json({
            success: true,
            message: "OTP verified successfully"
        });

    } catch (error) {
        console.error("Error in OTP verification:", error);
        return res.status(500).json({
            success: false,
            message: "OTP verification failed",
            error: error.message
        });
    }
}; 