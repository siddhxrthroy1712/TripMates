import React from "react";
import { useNavigate } from "react-router-dom";
import { FaLessThan } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";

const ContactSupport = () => {
  const navigate = useNavigate();

  const handleEmailUs = () => {
    window.location.href = "mailto:unigo@gmail.com";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#412160] text-white p-6 flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-purple-700 rounded-full transition-all"
        >
          <FaLessThan className="text-xl text-white" />
        </button>
        <h1 className="text-2xl">Contact Support</h1>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center px-6 py-12">
        {/* Support Icon */}
        <div className="w-32 h-32 mb-8">
          <BiSupport className="w-full h-full text-[#412160]" />
        </div>

        {/* Help Text */}
        <h2 className="text-3xl font-semibold text-[#412160] mb-4">
          Need some help?
        </h2>
        <p className="text-gray-400 text-center text-lg mb-4">
          Get Lost? Stuck Somewhere?
        </p>
        <p className="text-gray-400 text-center text-lg mb-12">
          Feel free to get in touch with us
        </p>

        {/* Buttons */}
        <div className="w-full max-w-md space-y-4">
          <button
            onClick={() => navigate("/contact-us")}
            className="w-full max-w-xl bg-[#412160] text-white py-4 rounded-lg text-xl hover:bg-[#4f2875] transition-colors"
          >
            Contact Us
          </button>

          <button
            onClick={handleEmailUs}
            className="w-full max-w-xl border-2 border-[#412160] text-[#412160] py-4 rounded-lg text-xl hover:bg-gray-50 transition-colors"
          >
            Email Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactSupport;
