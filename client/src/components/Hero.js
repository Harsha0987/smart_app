import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <motion.section
      className="relative flex flex-col items-center justify-center min-h-[60vh] py-24 bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-400 overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5 }}
    >
      {/* Decorative Circles */}
      <motion.div
        className="absolute top-10 left-10 w-40 h-40 bg-cyan-300 opacity-30 rounded-full blur-2xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-56 h-56 bg-pink-400 opacity-20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      />
      {/* Main Content with Image and Title Side by Side */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-10 w-full max-w-5xl">
        {/* Title and Description */}
        <motion.div
          className="flex-1 flex flex-col items-center md:items-start text-center md:text-left"
          initial={{ opacity: 0, x: -120 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 1.2, type: "spring" }}
        >
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 bg-clip-text text-transparent mb-6 font-montserrat drop-shadow-lg"
            initial={false}
            animate={false}
          >
            Elevate Your Ideas
            <br />
            with <span className="text-white">SmartApp</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-2xl text-white/90 max-w-2xl mb-10 font-montserrat"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1, duration: 1.2, type: "spring" }}
          >
            Discover, share, and connect with a vibrant community. <br />
            Post your thoughts, explore trending topics, and join the conversation in a
            modern, beautiful space.
          </motion.p>
          <motion.div
            className="relative flex flex-col items-center md:items-start"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 1.2, type: "spring" }}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.97 }}
            style={{ width: "fit-content" }}
          >
            {/* Diagonal shining effect */}
            <div className="relative w-full">
              <Link
                to="/new"
                className="relative px-10 py-4 rounded-full bg-gradient-to-r from-orange-400 via-yellow-300 to-yellow-500 text-blue-900 font-extrabold text-lg shadow-lg hover:shadow-2xl transition-all font-montserrat overflow-hidden block"
                style={{
                  boxShadow: "0 4px 24px 0 rgba(255, 200, 0, 0.25)",
                  letterSpacing: "0.04em",
                }}
              >
                {/* Shining effect */}
                <motion.span
                  className="pointer-events-none"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: "100%",
                    width: "100%",
                    zIndex: 2,
                    display: "block",
                  }}
                  initial={{ x: "-120%" }}
                  animate={{ x: "120%" }}
                  transition={{
                    repeat: Infinity,
                    duration: 3.5,
                    ease: "linear",
                  }}
                >
                  <span
                    style={{
                      display: "block",
                      width: "60px",
                      height: "100%",
                      transform: "rotate(25deg)",
                      background:
                        "linear-gradient(120deg, rgba(255,255,255,0) 60%, rgba(255,255,255,0.7) 80%, rgba(255,255,255,0) 100%)",
                      opacity: 0.7,
                      filter: "blur(1px)",
                      position: "absolute",
                      left: 0,
                      top: 0,
                    }}
                  />
                </motion.span>
                Get Started
              </Link>
            </div>
          </motion.div>
        </motion.div>
        {/* Image */}
        <motion.div
          className="flex-1 flex justify-center items-center"
          initial={{ opacity: 0, x: 120 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.2, duration: 1.3, type: "spring" }}
        >
          <img
            src="https://thumbs.dreamstime.com/b/elderly-characters-using-smartphones-tablets-tech-enabled-neighborhood-d-paper-cut-style-elderly-characters-using-396624877.jpg?w=768"
            alt="Elderly characters using smartphones and tablets"
            className="rounded-3xl shadow-2xl max-w-xs md:max-w-sm w-full object-cover"
            style={{ background: "#fff" }}
          />
        </motion.div>
      </div>
    </motion.section>
  );
}

export default Hero;
