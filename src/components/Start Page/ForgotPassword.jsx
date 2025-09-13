import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Logo from "../common/Logo";
import Button from "../common/Button";
import Input from "../common/Input";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [contactInfo, setContactInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!contactInfo.trim()) {
      setError("Please enter your email or phone number");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Determine if input is email or phone number
      const isEmail = contactInfo.includes('@');

      // Prepare data for password reset request
      const resetData = {
        contactMethod: isEmail ? "email" : "phone",
        ...(isEmail ? { email: contactInfo } : { phoneNumber: contactInfo })
      };

      // Send password reset request
      await authService.sendOTP(resetData);

      // Navigate to OTP verification for password reset
      navigate("/signup/passenger/otp", {
        state: {
          ...(isEmail ? { email: contactInfo } : { mobileNumber: contactInfo }),
          contactMethod: resetData.contactMethod,
          isPasswordReset: true
        }
      });
    } catch (err) {
      console.error('Password reset error:', err);
      setError(err.message || "Failed to send reset code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-purple-900 flex flex-col items-center justify-center p-4">
      <div className="flex justify-center mb-4">
        <Logo className="h-40" />
      </div>
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-purple-800 mb-8">
          Forgot Password
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            type="text"
            placeholder="Enter Email or Number"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            icon={<MdEmail className="w-6 h-6 text-purple-800" />}
          />

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          {success && (
            <p className="text-green-500 text-sm text-center">{success}</p>
          )}

          <Button
            type="submit"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Code"}
          </Button>
        </form>

        <div className="mt-8 text-center space-y-2">
          <p className="text-gray-600">
            Back to{" "}
            <Link to="/signin" className="text-purple-800 font-semibold">
              Sign In
            </Link>
          </p>

          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-purple-800 font-semibold">
              Sign Up
            </Link>
          </p>
        </div>

        <div className="mt-8 flex justify-center space-x-4">
          <button className="w-12 h-12 rounded-full bg-purple-800 flex items-center justify-center">
            <FaFacebookF className="text-white text-xl" />
          </button>
          <button className="w-12 h-12 rounded-full bg-purple-800 flex items-center justify-center">
            <FaGoogle className="text-white text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
