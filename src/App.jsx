import React, { useState, useEffect } from "react";
import "./index.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import FindVehical from "./components/FindVehical/Findvehical";
import Filter from "./components/FindVehical/Filter";
import VehicleDetail from "./components/FindVehical/VehicleDetail";
import UserProfile from "./components/UserProfile/UserProfile";
import ChatMessage from "./components/ChatMessage/ChatMessage";
import Menubar from "./components/Menu Bar/Menubar";
import PassengerProfile from "./components/Menu Bar/PassangerProfile";
import ContactSupport from "./components/Menu Bar/ContactSupport";
import ContactUs from "./components/Menu Bar/ContactUs";
import Settings from "./components/Menu Bar/Settings";
import Notification from "./components/Menu Bar/Notification";
import BookingHistory from "./components/Menu Bar/BookingHistory";
import RideOTP from "./components/FindVehical/RideOtp";
import RideInProgress from "./components/RideInProgress/RideInProgress";
import PaymentComplete from "./components/Menu Bar/PaymentComplete";
import RatingPage from "./components/Rating/RatingPage";
import HomePage from "./components/HomePage/HomePage";
import InboxPage from "./components/InboxPage/InboxPage";
import DriverOtpVerification from "./components/driver/DriverOtpVerification";
import DriverSignUpChoice from "./components/driver/DriverSignUpChoice";
import DriverRegistration from "./components/driver/DriverRegistration";
import OtpVerification from "./components/passenger/OtpVerification";
import UserDetails from "./components/passenger/UserDetails";
import SignUpChoice from "./components/passenger/SignUpChoice";
import SplashScreen from "./components/Start Page/SplashScreen";
import SignIn from "./components/Start Page/SignIn";
import SignUp from "./components/Start Page/SignUp";
import ForgotPassword from "./components/Start Page/ForgotPassword";
import Getride from "./components/Search Destination/Getride";
import RideRequest from "./components/RideRequest/RideRequest";
import MenuBar from "./components/Payment Menu/MenuBar";
import SechduleRide from "./components/Sechdule Ride/SechduleRide";
import AppSettings from "./components/App Setting/AppSetting";
import ChangePassword from "./components/Change Password/ChangePassword";
import About from "./components/About Us/AboutUs";
import DriverMenubar from "./components/Driver Menubar/DriveMenubar";
import RideDetails from "./components/Driver Menubar/RideDetails";
import DriverProfile from "./components/Driver Menubar/DriverProfile";

function App() {
  //   const [notifications, setNotifications] = useState([]);
  //   useEffect(() => {
  //     // Fetch notifications from your backend
  //     const fetchNotifications = async () => {
  //       try {
  //         const response = await fetch("/api/notifications");
  //         const data = await response.json();
  //         setNotifications(data);
  //       } catch (error) {
  //         console.error("Error fetching notifications:", error);
  //       }
  //     };
  //     fetchNotifications();
  //   }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/signup/driver/choice" element={<DriverSignUpChoice />} />
        <Route
          path="/signup/driver/registration"
          element={<DriverRegistration />}
        />
        <Route path="/signup/driver/otp" element={<DriverOtpVerification />} />
        <Route path="/signup/passenger/choice" element={<SignUpChoice />} />
        <Route path="/signup/passenger/otp" element={<OtpVerification />} />
        <Route path="/signup/passenger/details" element={<UserDetails />} />
        <Route path="/ride-in-progress" element={<RideInProgress />} />
        <Route path="/payment-complete" element={<PaymentComplete />} />
        <Route path="/rating" element={<RatingPage />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/chat" element={<ChatMessage />} />
        <Route path="/inbox" element={<InboxPage />} />
        <Route path="/vehicle-detail" element={<VehicleDetail />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/support" element={<ContactSupport />} />
        <Route path="/filter" element={<Filter />} />
        <Route path="/ride-otp" element={<RideOTP />} />
        <Route path="/menubar" element={<Menubar />} />
        <Route path="/profile" element={<PassengerProfile />} />
        <Route path="/find-vehicle" element={<FindVehical />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/booking-history" element={<BookingHistory />} />
        <Route path="/getride" element={<Getride />} />
        <Route path="/m" element={<MenuBar />} />
        <Route path="/ride" element={<RideRequest />} />
        <Route path="/Sechdule-ride" element={<SechduleRide />} />
        <Route path="/app-settings" element={<AppSettings />} />
        <Route path="/change-pass" element={<ChangePassword />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/driver-menue" element={<DriverMenubar />} />
        <Route path="/ride-details" element={<RideDetails />} />
        <Route path="/driver-profile" element={<DriverProfile />} />
      </Routes>
    </Router>

    //          <Route path="/signup/driver/success" element={<DriverSuccess />} />
    //          <Route path="/signup/driver/login" element={<DriverLogin />} />
  );
}

export default App;
