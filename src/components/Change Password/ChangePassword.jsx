import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaLessThan } from "react-icons/fa";
import authService from "../../services/authService";

const ChangePassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Get verified contact info from location state
  const { mobileNumber, email, verified, isPasswordReset } = location.state || {};

  useEffect(() => {
    // Log the state received from navigation
    console.log('ChangePassword component state:', { mobileNumber, email, verified, isPasswordReset });

    // If this is not a password reset and user is not verified, redirect to home
    if (!isPasswordReset && !verified) {
      console.log('Not a password reset or not verified, redirecting to home');
      navigate("/");
    }
  }, [isPasswordReset, verified, navigate, mobileNumber, email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    // Simple validation for password length
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      // Prepare data for password change
      const passwordData = {
        ...(email ? { email } : { phoneNumber: mobileNumber }),
        currentPassword: isPasswordReset ? null : currentPassword,
        newPassword,
        isReset: !!isPasswordReset
      };

      // Log for debugging
      console.log('Changing password with data:', {
        ...passwordData,
        currentPassword: passwordData.currentPassword ? '[HIDDEN]' : null,
        newPassword: '[HIDDEN]'
      });

      // Call API to change password
      await authService.changePassword(passwordData);
      console.log("Password changed successfully");

      setMessage("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      // Redirect to login after successful password change
      setTimeout(() => {
        navigate("/signin", {
          state: { message: "Password changed successfully. Please login with your new password." }
        });
      }, 2000);
    } catch (err) {
      setError(err.message || "Failed to change password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const InputGroup = ({ label, value, onChange }) => (
    <div className="mb-4">
      <label htmlFor={label} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        type="password"
        id={label}
        value={value}
        onChange={onChange}
        className="py-2 px-3 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 text-sm"
        required
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#412160] text-white">
        <div className="container mx-auto max-w-2xl px-6 py-4">
          <div className="relative flex items-center justify-center">
            <button
              onClick={() => navigate(-1)}
              className="absolute left-0 p-2 hover:bg-purple-700 rounded-full transition-all"
            >
              <FaLessThan className="text-xl" />
            </button>
            <h1 className="text-xl font-bold">
              {isPasswordReset ? "Reset Password" : "Change Password"}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-2xl p-6">
        {/* Password Form */}
        <div className="bg-white rounded-xl shadow-sm p-6 mt-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isPasswordReset && (
              <InputGroup
                label="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            )}

            <InputGroup
              label="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <InputGroup
              label="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {error && (
              <div className="p-3 bg-red-50 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            {message && (
              <div className="p-3 bg-green-50 text-green-700 rounded-lg">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-[#412160] hover:bg-purple-800 text-white font-semibold py-3 rounded-lg shadow-sm transition-colors mt-4 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? "Changing Password..." : "Change Password"}
            </button>
          </form>
        </div>

        {/* Back button */}
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-[#412160] font-semibold hover:underline"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
