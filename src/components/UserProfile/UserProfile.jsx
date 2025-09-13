import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaComments, FaLessThan } from "react-icons/fa";
import { IoWarning } from "react-icons/io5";

const UserProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReported, setIsReported] = useState(false);

  const driverData = location.state?.driverData || {
    name: "Sonu",
    age: "22 y/o",
    experience: "Newcomer",
    email: "confirmed",
    phone: "confirmed",
    about: "I'm chatty when I feel comfortable",
    ridesPublished: 2,
    memberSince: "January 2025",
  };

  const handleReportClick = () => {
    setIsModalOpen(true);
  };

  const reportMember = () => {
    setIsReported(true);
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Header */}
      <div className="bg-[#412160] text-white">
        {/* Back Button and Profile Info Container */}
        <div className="container mx-auto max-w-2xl px-6 py-4">
          <div className="relative flex flex-col items-center">
            {/* Back Button - Absolute positioned with vertical centering */}
            <button
              onClick={() => navigate(-1)}
              className="absolute left-0 top-1/2 ml-2 p-2 hover:bg-purple-700 rounded-full transition-all transform -translate-y-1/2"
            >
              <FaLessThan className="text-xl" />
            </button>

            {/* Profile Image and Info - Centered */}
            <div className="flex flex-col items-center gap-3 mt-8">
              <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
              <div className="text-center">
                <h1 className="text-2xl font-bold">{driverData.name}</h1>
                <p className="text-gray-200">{driverData.age}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="container mx-auto max-w-2xl p-6 space-y-8">
        {/* Experience Level */}
        <div>
          <h2 className="text-[#412160] font-semibold mb-2">
            Experience level
          </h2>
          <p className="text-gray-600">{driverData.experience}</p>
        </div>

        {/* Verifications */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-gray-600">
            <FaCheckCircle className="text-[#412160]" />
            <span>Confirmed email</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <FaCheckCircle className="text-[#412160]" />
            <span>Confirmed phone number</span>
          </div>
        </div>

        {/* About Section */}
        <div>
          <h2 className="text-[#412160] font-semibold mb-4">
            About {driverData.name}
          </h2>
          <div className="flex items-start gap-3 text-gray-600">
            <FaComments className="text-[#412160] mt-1" />
            <p>{driverData.about}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-4 border-t border-b py-6">
          <p className="text-gray-600">
            {driverData.ridesPublished} rides published
          </p>
          <p className="text-gray-600">Member since {driverData.memberSince}</p>
        </div>

        {/* Report Button */}
        <button onClick={handleReportClick} className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors">
          <IoWarning />
          <span>Report this member</span>
        </button>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg">
              <h2 className="text-lg font-bold">Report Member</h2>
              <p>Are you sure you want to report this member?</p>
              <div className="flex justify-end mt-4">
                <button onClick={closeModal} className="mr-2 text-gray-500">Cancel</button>
                <button onClick={reportMember} className="bg-red-500 text-white px-4 py-2 rounded">Report</button>
              </div>
            </div>
          </div>
        )}

        {/* Success Message */}
        {isReported && (
          <div className="mt-4 p-4 bg-green-100 text-green-800 rounded">
            Successfully reported the member.
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
