import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  // Don't show footer on certain routes
  const location = window.location.pathname;
  const hideFooterRoutes = ["/vehicle-detail", "/booking", "/filter"];

  if (hideFooterRoutes.includes(location)) {
    return null;
  }

  return (
    <footer className="bg-purple-950 text-white py-6 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Unigo</h3>
            <p className="text-gray-200 text-sm">
              Discover affordable rides and plan your journey with ease. Join us
              at Unigo for the best travel experience.
            </p>
          </div>

          {/* Links Section */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-200 hover:text-purple-300 text-sm"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-200 hover:text-purple-300 text-sm"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-200 hover:text-purple-300 text-sm"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-200 hover:text-purple-300 text-sm"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-200 hover:text-purple-300">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-200 hover:text-purple-300">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-200 hover:text-purple-300">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-200 hover:text-purple-300">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold">Contact Us</h4>
            <div className="space-y-2">
              <p className="text-gray-200 text-sm">Email: support@unigo.com</p>
              <p className="text-gray-200 text-sm">Phone: +1 234 567 890</p>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-purple-900">
          <p className="text-gray-200 text-sm text-center">
            &copy; {new Date().getFullYear()} Unigo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
