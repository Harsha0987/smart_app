// src/components/CommunityFeatures.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShieldAlert,
  CalendarCheck,
  MessagesSquare,
  CarFront,
} from "lucide-react";

function CommunityFeatures() {
  const navigate = useNavigate();

  const features = [
    {
      name: "Suspicious Reports",
      path: "/reports",
      icon: <ShieldAlert className="w-10 h-10 text-red-500" />,
    },
    {
      name: "Events & Reminders",
      path: "/events",
      icon: <CalendarCheck className="w-10 h-10 text-blue-500" />,
    },
    {
      name: "Group Chat",
      path: "/chat",
      icon: <MessagesSquare className="w-10 h-10 text-green-500" />,
    },
    {
      name: "Parking Finder",
      path: "/parking",
      icon: <CarFront className="w-10 h-10 text-purple-500" />,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto mt-12 p-6">
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-10">
        Community Features
      </h2>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((f, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(f.path)}
            className="relative cursor-pointer rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 bg-white/70 backdrop-blur-md border border-gray-200 p-6 text-center"
          >
            {/* Icon + Name */}
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                {f.icon}
              </motion.div>
              <span className="mt-4 font-semibold text-lg text-gray-700">
                {f.name}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default CommunityFeatures;
