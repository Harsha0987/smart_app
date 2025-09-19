import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  // get logged-in user from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  };

  if (!storedUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-700">You are not logged in.</p>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 px-6 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Profile Card */}
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl w-full text-center">
        {/* Avatar */}
        <motion.img
          src="https://api.dicebear.com/7.x/bottts/svg?seed=random123"
          alt="User Avatar"
          className="w-32 h-32 rounded-full mx-auto mb-6 shadow-md border"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
        />

        {/* User Info */}
        <h1 className="text-2xl font-bold text-gray-800">{storedUser.name}</h1>
        <p className="text-gray-600">{storedUser.email}</p>
        <p className="mt-4 text-gray-700">Welcome to your profile page 🎉</p>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <button className="px-6 py-2 bg-indigo-500 text-white rounded-full shadow hover:bg-indigo-600 transition">
            Edit Profile
          </button>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-500 text-white rounded-full shadow hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Extra Sections */}
      <div className="mt-10 grid gap-6 md:grid-cols-3 w-full max-w-5xl">
        {/* About Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">About</h2>
          <p className="text-gray-600">
            Hi, I’m {storedUser.name}. This is a short description about me. You
            can update it later from edit profile section.
          </p>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Recent Activity</h2>
          <ul className="text-gray-600 text-sm space-y-2">
            <li>✔️ Logged in successfully</li>
            <li>📌 Updated profile details</li>
            <li>💬 Joined a new discussion</li>
          </ul>
        </div>

        {/* Settings */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Settings</h2>
          <p className="text-gray-600">
            Manage your preferences, security settings, and more.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default Profile;
