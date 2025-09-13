import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLessThan } from "react-icons/fa";
import { IoCheckmarkCircle } from "react-icons/io5";

const ContactUs = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log("Form submitted:", formData);
    setShowPopup(true);
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  // Popup component
  const SuccessPopup = () => (
    <div className="fixed inset-0 bg-purple-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-sm w-full mx-4 relative">
        <div className="flex flex-col items-center text-center">
          <IoCheckmarkCircle className="text-6xl text-green-500 mb-4" />
          <h2 className="text-2xl font-semibold text-[#412160] mb-2">
            Thank You!
          </h2>
          <p className="text-gray-600 mb-6">
            Your message has been sent successfully. We will get back to you
            soon.
          </p>
          <button
            onClick={() => {
              setShowPopup(false);
              navigate(-1);
            }}
            className="bg-[#412160] text-white px-8 py-3 rounded-lg hover:bg-[#4f2875] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

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
        <h1 className="text-2xl">Contact Us</h1>
      </div>

      {/* Contact Form */}
      <div className="p-6 max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-[#412160] font-medium mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#412160]"
              placeholder="Enter your name"
            />
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-[#412160] font-medium mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#412160]"
              placeholder="Enter your email"
            />
          </div>

          {/* Subject Field */}
          <div>
            <label
              htmlFor="subject"
              className="block text-[#412160] font-medium mb-2"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#412160]"
              placeholder="Enter subject"
            />
          </div>

          {/* Message Field */}
          <div>
            <label
              htmlFor="message"
              className="block text-[#412160] font-medium mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#412160]"
              placeholder="Type your message here..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#412160] text-white py-4 rounded-lg text-xl hover:bg-[#4f2875] transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Success Popup */}
      {showPopup && <SuccessPopup />}
    </div>
  );
};

export default ContactUs;
