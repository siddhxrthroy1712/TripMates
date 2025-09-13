const OTP = require("../../models/OTP");
const otpGenerator = require("otp-generator");
const mailSender = require("../../utils/mailSender");
const { twilioClient } = require("../../utils/twilioClient");
const otpTemplate = require("../../templates/emailVerification");

exports.sendOTP = async (req, res) => {
    try {
        const { email, phoneNumber, contactMethod } = req.body;

        if (!contactMethod) {
            return res.status(400).json({
                success: false,
                message: "Contact method is required (email or phone)"
            });
        }

        // Validate contact method and corresponding value
        if (contactMethod === "email" && !email) {
            return res.status(400).json({
                success: false,
                message: "Email is required for email verification"
            });
        }

        if (contactMethod === "phone" && !phoneNumber) {
            return res.status(400).json({
                success: false,
                message: "Phone number is required for phone verification"
            });
        }

        // Generate OTP
        const otp = otpGenerator.generate(4, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        // Create OTP payload based on contact method
        const otpPayload = {
            otp,
            ...(contactMethod === "email" ? { email } : { phoneNumber })
        };

        // Delete any existing OTP for this contact
        if (contactMethod === "email") {
            await OTP.deleteMany({ email });
        } else {
            await OTP.deleteMany({ phoneNumber });
        }

        // Save new OTP
        await OTP.create(otpPayload);

        // Send OTP based on contact method
        if (contactMethod === "email") {
            await mailSender(
                email,
                "Verify Your Email",
                otpTemplate(otp)
            );
        } else {
            // Format phone number if needed (add country code if not present)
            const formattedPhone = phoneNumber.startsWith('+') 
                ? phoneNumber 
                : `+91${phoneNumber}`; // Assuming Indian numbers by default

            await twilioClient.messages.create({
                body: `Your UniGo verification code is: ${otp}`,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: formattedPhone
            });
        }

        return res.status(200).json({
            success: true,
            message: `OTP sent successfully to your ${contactMethod}`,
            contactMethod,
            ...(contactMethod === "email" ? { email } : { phoneNumber })
        });

    } catch (error) {
        console.error("Error sending OTP:", error);
        
        // Handle specific Twilio errors
        if (error.code) {
            return res.status(400).json({
                success: false,
                message: "Failed to send SMS. Please check the phone number.",
                error: error.message
            });
        }

        return res.status(500).json({
            success: false,
            message: "Failed to send OTP",
            error: error.message
        });
    }
}; 