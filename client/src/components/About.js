import React from "react";
import { motion } from "framer-motion";

function About() {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-400 text-white px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h1 className="text-4xl font-extrabold mb-6">About SmartApp</h1>
      <p className="text-lg max-w-3xl text-center leading-relaxed">
        SmartApp is a modern platform designed to help you share your thoughts, connect
        with others, and explore trending topics. Our mission is to create a vibrant
        community where ideas can flourish and creativity thrives.
      </p>
      <motion.div
        className="mt-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-3xl font-bold px-8 py-4 rounded-lg shadow-lg"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        SmartApp
      </motion.div>
    </motion.div>
  );
}

export default About;