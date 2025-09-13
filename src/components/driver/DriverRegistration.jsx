import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import authService from "../../services/authService";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaCalendarAlt,
  FaIdCard,
  FaCamera,
  FaUniversity,
} from "react-icons/fa";
import { MdPhone } from "react-icons/md";
import { IoCarSport } from "react-icons/io5";

const DriverRegistration = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState("");

  // Get verified contact info from location state
  const { mobileNumber, email, verified } = location.state || {};

  const [formData, setFormData] = useState({
    fullName: "",
    email: email || "",
    password: "",
    confirmPassword: "",
    mobile: mobileNumber || "",
    dob: "",
    vehicleNumber: "",
    drivingLicense: null,
    photo: null,
    universityId: null,
    state: "Uttarakhand", // Default state
    city: "Roorkee", // Default city
  });

  useEffect(() => {
    // Redirect back if not verified
    if (!verified) {
      console.log('User not verified, redirecting to signup choice');
      navigate("/signup/driver/choice");
    } else {
      console.log('User verified, continuing with registration');
    }
  }, [verified, navigate]);

  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.mobile) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Invalid mobile number";
    }

    if (!formData.dob) {
      newErrors.dob = "Date of birth is required";
    }

    if (!formData.vehicleNumber.trim()) {
      newErrors.vehicleNumber = "Vehicle number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const validateStep2 = () => {
    const newErrors = {};

    if (!formData.drivingLicense) {
      newErrors.drivingLicense = "Driving license is required";
    }

    if (!formData.photo) {
      newErrors.photo = "Photo is required";
    }

    if (!formData.universityId) {
      newErrors.universityId = "University ID is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleFileChange = (field, file) => {
    setFormData((prev) => ({
      ...prev,
      [field]: file,
    }));
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep2()) {
      setLoading(true);
      setGeneralError("");

      try {
        // Create FormData object for file uploads
        const formDataObj = new FormData();
        formDataObj.append('fullName', formData.fullName);
        formDataObj.append('email', formData.email);
        formDataObj.append('password', formData.password);
        formDataObj.append('confirmPassword', formData.confirmPassword);
        formDataObj.append('phoneNumber', formData.mobile);
        formDataObj.append('dateOfBirth', formData.dob);
        formDataObj.append('role', 'DRIVER');
        formDataObj.append('vehicleNumber', formData.vehicleNumber);
        formDataObj.append('state', formData.state || 'Uttarakhand');
        formDataObj.append('city', formData.city || 'Roorkee');

        // Append files
        if (formData.drivingLicense) {
          formDataObj.append('drivingLicense', formData.drivingLicense);
        }
        if (formData.photo) {
          formDataObj.append('profilePhoto', formData.photo);
        }
        if (formData.universityId) {
          formDataObj.append('universityIdCard', formData.universityId);
        }

        console.log('Attempting driver signup with:', formData.fullName, formData.email);

        // Call signup API with FormData
        const response = await authService.signup(formDataObj, true);
        console.log('Driver signup successful:', response);

        // Save user data if available
        if (response.user) {
          authService.setCurrentUser(response.user);
        }

        // Navigate to signin page with success message
        navigate("/signin", {
          state: { message: "Registration successful! Please login with your credentials." }
        });
      } catch (err) {
        console.error('Driver signup error:', err);
        if (err.message) {
          setGeneralError(err.message);
        } else if (typeof err === 'string') {
          setGeneralError(err);
        } else {
          setGeneralError("Registration failed. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-purple-800 flex flex-col items-center">
      <div className="w-full px-4 py-6">
        <h1 className="text-2xl text-white text-center font-semibold mb-6">
          UniGo! Ride Sharing
        </h1>

        <div className="bg-white rounded-3xl p-6 max-w-md mx-auto">
          <h2 className="text-3xl font-bold text-center text-purple-800 mb-6">
            SIGN UP
          </h2>

          <div className="flex items-center justify-center mb-8">
            <div
              className={`w-8 h-8 rounded-full ${
                currentStep === 1 ? "bg-purple-800" : "bg-purple-800"
              } text-white flex items-center justify-center`}
            >
              1
            </div>
            <div className="w-16 h-1 bg-purple-800"></div>
            <div
              className={`w-8 h-8 rounded-full ${
                currentStep === 2 ? "bg-purple-800" : "bg-gray-300"
              } text-white flex items-center justify-center`}
            >
              2
            </div>
          </div>

          <form onSubmit={currentStep === 1 ? handleNextStep : handleSubmit}>
            {currentStep === 1 ? (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-purple-800 mb-4">
                  Driver Details
                </h3>

                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-800" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={(e) =>
                      handleInputChange("fullName", e.target.value)
                    }
                    className={`w-full pl-12 pr-4 py-3 border-2 ${
                      errors.fullName ? "border-red-500" : "border-purple-800"
                    } rounded-full focus:outline-none`}
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1 ml-4">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-800" />
                  <input
                    type="email"
                    placeholder="Email Id"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`w-full pl-12 pr-4 py-3 border-2 ${
                      errors.email ? "border-red-500" : "border-purple-800"
                    } rounded-full focus:outline-none`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1 ml-4">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-800" />
                  <input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    className={`w-full pl-12 pr-4 py-3 border-2 ${
                      errors.password ? "border-red-500" : "border-purple-800"
                    } rounded-full focus:outline-none`}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1 ml-4">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-800" />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleInputChange("confirmPassword", e.target.value)
                    }
                    className={`w-full pl-12 pr-4 py-3 border-2 ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-purple-800"
                    } rounded-full focus:outline-none`}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1 ml-4">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <MdPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-800" />
                  <input
                    type="tel"
                    placeholder="Mobile Number"
                    maxLength={10}
                    value={formData.mobile}
                    onChange={(e) =>
                      handleInputChange("mobile", e.target.value)
                    }
                    className={`w-full pl-12 pr-4 py-3 border-2 ${
                      errors.mobile ? "border-red-500" : "border-purple-800"
                    } rounded-full focus:outline-none`}
                  />
                  {errors.mobile && (
                    <p className="text-red-500 text-sm mt-1 ml-4">
                      {errors.mobile}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-800" />
                  <input
                    type="date"
                    max={getCurrentDate()}
                    value={formData.dob}
                    onChange={(e) => handleInputChange("dob", e.target.value)}
                    className={`w-full pl-12 pr-4 py-3 border-2 ${
                      errors.dob ? "border-red-500" : "border-purple-800"
                    } rounded-full focus:outline-none`}
                  />
                  {errors.dob && (
                    <p className="text-red-500 text-sm mt-1 ml-4">
                      {errors.dob}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <IoCarSport className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-800" />
                  <input
                    type="text"
                    placeholder="Car/Bike Number"
                    value={formData.vehicleNumber}
                    onChange={(e) =>
                      handleInputChange("vehicleNumber", e.target.value)
                    }
                    className={`w-full pl-12 pr-4 py-3 border-2 ${
                      errors.vehicleNumber
                        ? "border-red-500"
                        : "border-purple-800"
                    } rounded-full focus:outline-none`}
                  />
                  {errors.vehicleNumber && (
                    <p className="text-red-500 text-sm mt-1 ml-4">
                      {errors.vehicleNumber}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-800 text-white py-3 rounded-full font-semibold hover:bg-purple-700 transition-colors"
                >
                  Save and Continue
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-purple-800 mb-6">
                  Upload Documents
                </h3>

                <div className="relative">
                  <div
                    className={`relative border-2 ${
                      errors.drivingLicense
                        ? "border-red-500"
                        : "border-purple-800"
                    } rounded-full`}
                  >
                    <FaIdCard className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-800 text-xl z-10" />
                    <label className="block relative">
                      <span className="sr-only">Choose Driving License</span>
                      <span className="absolute left-12 top-1/2 -translate-y-1/2 text-purple-800/70">
                        {formData.drivingLicense
                          ? formData.drivingLicense.name
                          : "Upload Driving License"}
                      </span>
                      <input
                        type="file"
                        onChange={(e) =>
                          handleFileChange("drivingLicense", e.target.files[0])
                        }
                        className="block w-full text-transparent cursor-pointer py-4 px-12
                                 file:hidden focus:outline-none"
                        accept=".pdf,.jpg,.jpeg,.png"
                      />
                    </label>
                  </div>
                  {errors.drivingLicense && (
                    <p className="text-red-500 text-sm mt-1 ml-4">
                      {errors.drivingLicense}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <div
                    className={`relative border-2 ${
                      errors.photo ? "border-red-500" : "border-purple-800"
                    } rounded-full`}
                  >
                    <FaCamera className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-800 text-xl z-10" />
                    <label className="block relative">
                      <span className="sr-only">Choose Photo</span>
                      <span className="absolute left-12 top-1/2 -translate-y-1/2 text-purple-800/70">
                        {formData.photo
                          ? formData.photo.name
                          : "Upload Your Photo"}
                      </span>
                      <input
                        type="file"
                        onChange={(e) =>
                          handleFileChange("photo", e.target.files[0])
                        }
                        className="block w-full text-transparent cursor-pointer py-4 px-12
                                 file:hidden focus:outline-none"
                        accept="image/*"
                      />
                    </label>
                  </div>
                  {errors.photo && (
                    <p className="text-red-500 text-sm mt-1 ml-4">
                      {errors.photo}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <div
                    className={`relative border-2 ${
                      errors.universityId
                        ? "border-red-500"
                        : "border-purple-800"
                    } rounded-full`}
                  >
                    <FaUniversity className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-800 text-xl z-10" />
                    <label className="block relative">
                      <span className="sr-only">Choose University ID</span>
                      <span className="absolute left-12 top-1/2 -translate-y-1/2 text-purple-800/70">
                        {formData.universityId
                          ? formData.universityId.name
                          : "Upload Your University Id Card"}
                      </span>
                      <input
                        type="file"
                        onChange={(e) =>
                          handleFileChange("universityId", e.target.files[0])
                        }
                        className="block w-full text-transparent cursor-pointer py-4 px-12
                                 file:hidden focus:outline-none"
                        accept=".pdf,.jpg,.jpeg,.png"
                      />
                    </label>
                  </div>
                  {errors.universityId && (
                    <p className="text-red-500 text-sm mt-1 ml-4">
                      {errors.universityId}
                    </p>
                  )}
                </div>

                {generalError && (
                  <p className="text-red-500 text-sm text-center mt-4">{generalError}</p>
                )}

                <div className="flex space-x-4 mt-6">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    disabled={loading}
                    className="w-1/2 border-2 border-purple-800 text-purple-800 py-4 rounded-full
                             font-semibold text-lg hover:bg-purple-50 transition-colors
                             disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-1/2 bg-purple-800 text-white py-4 rounded-full font-semibold text-lg
                             hover:bg-purple-700 transition-colors
                             disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </div>
            )}
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/signin" className="text-purple-800 font-semibold">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverRegistration;
