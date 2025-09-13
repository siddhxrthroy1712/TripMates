import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../common/Logo";

const SplashScreen = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentScreen < 3) {
      const timer = setTimeout(
        () => setCurrentScreen((prev) => prev + 1),
        1000
      );
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const getScreenClass = (screenIndex) => {
    if (screenIndex === currentScreen) {
      return "opacity-100 translate-y-0";
    }
    if (screenIndex < currentScreen) {
      return "opacity-0 -translate-y-full";
    }
    return "opacity-0 translate-y-full";
  };

  return (
    <div className="min-h-screen bg-[#4B0082] relative overflow-hidden">
      <div
        className={`absolute inset-0 transition-all duration-700 ease-in-out ${getScreenClass(
          0
        )}`}
      >
        <img
          src="/assets/bg-blob.png"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <img src="/assets/splash-1.png" alt="Splash" className="w-64" />
        </div>
      </div>

      <div
        className={`absolute inset-0 flex items-center justify-center p-4 transition-all duration-700 ease-in-out ${getScreenClass(
          1
        )}`}
      >
        <div className="max-w-md w-full text-center text-white">
          <h1 className="text-2xl md:text-3xl font-bold mb-8">
            Safe, fast and affordable rides at your fingertips.
          </h1>
          <img
            src="/assets/splash-2.png"
            alt="Splash"
            className="w-64 mx-auto"
          />
        </div>
      </div>

      <div
        className={`absolute inset-0 flex items-center justify-center p-4 transition-all duration-700 ease-in-out ${getScreenClass(
          2
        )}`}
      >
        <div className="max-w-md w-full text-center text-white">
          <h1 className="text-2xl md:text-3xl font-bold mb-8">
            Drive Together
            <br />
            Thrive Together
          </h1>
          <img
            src="/assets/splash-3.png"
            alt="Splash"
            className="w-64 mx-auto"
          />
        </div>
      </div>

      <div
        className={`absolute inset-0 flex flex-col transition-all duration-700 ease-in-out ${getScreenClass(
          3
        )}`}
      >
        <div className="flex-1 bg-[#4B0082] pt-6 px-4">
          {/* Logo */}
          <div className="flex justify-center mb-2">
            <Logo className="h-44" />
          </div>

          {/* Illustration */}
          <div className="flex justify-center">
            <img src="/assets/splash-4.png" alt="Splash" className="w-72" />
          </div>
        </div>

        {/* Bottom Card Container */}
        <div className="flex justify-center">
          {/* Bottom Card */}
          <div className="bg-white rounded-t-[2rem] px-6 pt-8 pb-6 w-[400px]">
            <div className="flex flex-col items-center">
              <h1 className="text-2xl font-bold text-black mb-6 w-80">
                Your pick of rides at low prices
              </h1>
              <div className="flex flex-col items-center space-y-3">
                <button
                  className="bg-[#4B0082] text-white py-3.5 text-lg rounded-full w-80 hover:bg-[#4B0082]/90 shadow-lg"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </button>
                <button
                  className="text-[#4B0082] text-lg font-medium hover:opacity-80"
                  onClick={() => navigate("/signin")}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {currentScreen < 3 && (
        <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                currentScreen === index ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SplashScreen;