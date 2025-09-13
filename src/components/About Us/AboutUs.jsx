// import React from "react";
import { motion } from "framer-motion";
const About = () => {
  return (
    <motion.div // Use motion.div for animation
      initial={{ opacity: 0, y: 20 }} // Initial animation state
      animate={{ opacity: 1, y: 0 }} // Final animation state
      transition={{ duration: 0.5, ease: "easeInOut" }} // Animation duration and easing
      className="container mx-auto p-6 mt-12 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg shadow-md" // Gradient background and card styling
    >
      <h1 className="text-4xl font-bold mb-6 text-purple-700 text-center animate-pulse">
        About Us
      </h1>{" "}
      {/* Animated title */}
      <div className="prose lg:prose-xl text-gray-800 leading-relaxed">
        {" "}
        {/* Improved typography and text color */}
        <p>
          We are a team of dedicated developers passionate about creating
          innovative and user-friendly applications. Our mission is to...
          (continue with your about text)
        </p>
        <h2 className="mt-6">Our Vision</h2> {/* Added margin top */}
        <p>To create a future where technology empowers everyone.</p>
       {/* Example image with rounded corners and shadow */}
       <motion.img // Animated image
          src="/assets/logo.png"
          alt="Our Team"
          className="rounded-lg shadow-lg mt-6 mx-auto hover:scale-105 transition-transform duration-300" // Hover effect
          whileHover={{ scale: 0.9 }} // Scale on hover
        />
        <h2 className="mt-6">Our Team</h2> {/* Team section */}
        <ul className="list-disc pl-6 text-lg">
          {" "}
          {/* Styled list */}
          <li>Team Member 1 - CEO</li>
          <li>Team Member 2 - CTO</li>
          <li>Team Member 3 - Lead Developer</li>
          {/* Add more team members */}
        </ul>
        <p className="mt-6">
          Contact us at:{" "}
          <a
            href="mailto:info@example.com"
            className="text-purple-600 hover:underline"
          >
            info@example.com
          </a>
        </p>{" "}
        {/* Contact link */}
      </div>
    </motion.div>
  );
};

export default About;
