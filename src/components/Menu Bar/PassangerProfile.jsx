import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaLessThan } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

const PassengerProfile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [profileData, setProfileData] = useState({
    fullName: "Saiyam",
    phoneNumber: "+91 9876543210",
    email: "saiyam@example.com",
    dob: "2002-02-09",
    location: "Roorkee, Uttrakhand",
  });

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#412160] text-white p-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-purple-700 rounded-full transition-all mr-3"
          >
            <FaLessThan className="text-xl text-white" />
          </button>
          <h1 className="text-xl">Profile</h1>
        </div>
      </div>

      {/* Profile Content */}
      <div className="p-6">
        {/* Profile Image */}
        <div className="flex justify-center mb-8 relative">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gray-300 overflow-hidden">
              {profileImage && (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <button
              onClick={handleImageClick}
              className="absolute bottom-0 right-0 bg-[#412160] p-2 rounded-full"
            >
              <MdEdit className="text-white" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
          </div>
        </div>

        {/* Profile Fields */}
        <div className="space-y-6">
          <ProfileField
            label="Full Name"
            name="fullName"
            value={profileData.fullName}
            isEditing={isEditing}
            onChange={handleInputChange}
          />
          <ProfileField
            label="Phone Number"
            name="phoneNumber"
            value={profileData.phoneNumber}
            isEditing={isEditing}
            onChange={handleInputChange}
          />
          <ProfileField
            label="Email"
            name="email"
            value={profileData.email}
            isEditing={isEditing}
            onChange={handleInputChange}
          />
          <ProfileField
            label="DOB(Date of Birth)"
            name="dob"
            value={profileData.dob}
            isEditing={isEditing}
            onChange={handleInputChange}
            type="date"
          />
          <ProfileField
            label="State & City"
            name="location"
            value={profileData.location}
            isEditing={isEditing}
            onChange={handleInputChange}
          />
        </div>

        {/* Edit Profile Button */}
        <button
          onClick={toggleEdit}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 
                   bg-[#412160] text-white px-8 py-3 rounded-full 
                   shadow-lg text-lg"
        >
          {isEditing ? "Save Profile" : "Edit Profile"}
        </button>
      </div>
    </div>
  );
};

// Helper component for profile fields
const ProfileField = ({
  label,
  name,
  value,
  isEditing,
  onChange,
  type = "text",
}) => (
  <div className="space-y-2">
    <label className="text-[#412160] text-lg">{label}</label>
    {isEditing ? (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border-b-2 border-[#412160] p-2 focus:outline-none"
      />
    ) : (
      <div className="w-full border-b-2 border-gray-300 p-2">{value}</div>
    )}
  </div>
);

export default PassengerProfile;
