import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../common/Logo";
import authService from "../../services/authService";

const OtpVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Get contact info from location state
  const { mobileNumber, email, contactMethod, isPasswordReset } = location.state || {};

  useEffect(() => {
    // Redirect back to signup choice if no contact info is provided
    if (!mobileNumber && !email) {
      navigate("/signup/passenger/choice");
    }
  }, [mobileNumber, email, navigate]);

  const handleChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 3) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate OTP
    const otpValue = otp.join('');
    if (otpValue.length !== 4) {
      setError("Please enter a valid 4-digit OTP");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Prepare data for OTP verification
      const verifyData = {
        otp: otpValue,
        ...(contactMethod === "email" ? { email } : { phoneNumber: mobileNumber })
      };

      // Verify OTP
      console.log('Verifying OTP with data:', verifyData);
      const response = await authService.verifyOTP(verifyData);
      console.log('OTP verification response:', response);

      // Navigate based on whether this is a password reset or signup
      if (isPasswordReset) {
        // Navigate to change password page
        navigate("/change-pass", {
          state: {
            mobileNumber,
            email,
            verified: true,
            isPasswordReset: true
          }
        });
      } else {
        // Navigate to user details page for signup
        navigate("/signup/passenger/details", {
          state: {
            mobileNumber,
            email,
            verified: true
          }
        });
      }
    } catch (err) {
      setError(err.message || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-purple-800 flex flex-col items-center">
      {/* Logo Section */}
      <div className=" flex items-center justify-center pt-6 pb-2">
        <Logo className="h-40 w-auto" />
      </div>

      {/* OTP Section */}
      <div className="w-full max-w-md bg-white rounded-[40px] p-8 mx-4 mb-4">
        <h1 className="text-3xl font-bold text-center text-purple-800 mb-8">
          Enter OTP
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-center space-x-4 mb-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                className="w-12 h-12 text-center text-2xl font-bold
                        border-2 border-purple-800 rounded-lg
                        focus:outline-none focus:ring-2 focus:ring-purple-800 focus:ring-opacity-50"
              />
            ))}
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center mb-4">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-xl font-semibold text-white bg-purple-800
                     rounded-full transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? "Verifying..." : "Confirm"}
          </button>
        </form>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/signup/passenger/choice")}
            className="text-purple-800 font-semibold text-lg"
          >
            Back
          </button>

          <p className="mt-4 text-sm text-gray-600">
            Didn't receive the OTP? {' '}
            <button
              onClick={async () => {
                setLoading(true);
                setError("");
                try {
                  const otpData = {
                    contactMethod: contactMethod || (email ? "email" : "phone"),
                    ...(email ? { email } : { phoneNumber: mobileNumber })
                  };
                  await authService.sendOTP(otpData);
                  setError("OTP resent successfully");
                } catch (err) {
                  setError("Failed to resend OTP. Please try again.");
                } finally {
                  setLoading(false);
                }
              }}
              className="text-purple-800 font-semibold"
              disabled={loading}
            >
              Resend OTP
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
