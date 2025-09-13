import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import authService from "../../services/authService";

const DriverOtpVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  // Get contact info from location state
  const { mobileNumber, email, contactMethod } = location.state || {};

  useEffect(() => {
    inputRefs[0].current?.focus();

    // Redirect back to signup choice if no contact info is provided
    if (!mobileNumber && !email) {
      navigate("/signup/driver/choice");
    }
  }, [mobileNumber, email, navigate]);

  const handleChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 3) {
        inputRefs[index + 1].current?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleConfirm = async () => {
    // Validate OTP
    if (!otp.every((digit) => digit)) {
      setError("Please enter a valid 4-digit OTP");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Prepare data for OTP verification
      const otpValue = otp.join('');
      const verifyData = {
        otp: otpValue,
        ...(contactMethod === "email" ? { email } : { phoneNumber: mobileNumber })
      };

      // Verify OTP
      console.log('Verifying OTP with data:', verifyData);
      const response = await authService.verifyOTP(verifyData);
      console.log('OTP verification response:', response);

      // Navigate to driver registration page
      navigate("/signup/driver/registration", {
        state: {
          mobileNumber,
          email,
          verified: true
        }
      });
    } catch (err) {
      setError(err.message || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-purple-800 flex flex-col items-center">
      <div className="w-full px-4 py-8">
        <h1 className="text-4xl text-white text-center font-bold mt-8 mb-12">
          UniGo! Ride Sharing
        </h1>

        <div className="bg-white rounded-3xl p-8 max-w-md mx-auto">
          <h2 className="text-3xl font-bold text-center text-purple-800 mb-12">
            Enter OTP
          </h2>

          <div className="flex justify-center space-x-4 mb-12">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={inputRefs[index]}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-2xl font-bold border-b-2 border-purple-800
                          focus:outline-none focus:border-purple-600"
              />
            ))}
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center mb-4">{error}</p>
          )}

          <button
            onClick={handleConfirm}
            disabled={loading}
            className={`w-full bg-purple-800 text-white py-3 rounded-full font-semibold ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? "Verifying..." : "Confirm"}
          </button>

          <p className="mt-4 text-sm text-center text-gray-600">
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

export default DriverOtpVerification;
