// AppSettings.js
import React from "react";

const AppSettings = () => {
  return (
    <div className="container mx-auto p-6 mt-10 bg-gray-100 rounded-lg shadow-md">
      {" "}
      {/* Card styling */}
      <h1 className="text-3xl font-bold mb-4 text-purple-700">
        App Settings
      </h1>{" "}
      {/* Themed color */}
      <div className="space-y-6">
        {" "}
        {/* Increased spacing */}
        <SettingCard title="Notifications">
          {" "}
          {/* Reusable SettingCard */}
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-purple-600 rounded"
            />{" "}
            {/* Themed checkbox */}
            <span className="ml-2 text-gray-700">Enable notifications</span>
          </label>
        </SettingCard>
        <SettingCard title="Theme">
          <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 sm:text-sm">
            {" "}
            {/* Themed select */}
            <option>Light</option>
            <option>Dark</option>
            <option>System Default</option>
          </select>
        </SettingCard>
        {/* Add more settings here */}
        <SettingCard title="Privacy">
          <p className="text-gray-700">Manage your privacy settings here.</p>
        </SettingCard>
        <SettingCard title="Account">
          <p className="text-gray-700">Manage your account details here.</p>
        </SettingCard>
      </div>
    </div>
  );
};

const SettingCard = (
  { title, children } // Reusable card component
) => (
  <div className="bg-white rounded-lg shadow p-4">
    <h2 className="text-lg font-medium mb-2 text-gray-800">{title}</h2>
    {children}
  </div>
);

export default AppSettings;
