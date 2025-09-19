// src/components/Navbar.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FiInfo } from "react-icons/fi"; // Info icon

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // ✅ Check if user is logged in
  const storedUser = JSON.parse(localStorage.getItem("user"));

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white/80 backdrop-blur-lg shadow-lg fixed top-0 left-0 w-full z-50"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent text-3xl font-extrabold tracking-tight">
            SmartApp
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { name: "Home", path: "/" },
            { name: "Create Post", path: "/new" },
            { name: "Features", path: "/features" }, // replaced About with Features
            { name: "Contact", path: "/contact" },
            { name: "Profile", path: "/profile" },
          ].map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="relative text-gray-700 font-medium hover:text-indigo-600 transition group"
            >
              {item.name}
              {/* Underline Animation */}
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}

          {/* ✅ If user logged in → show Welcome, else show Login/Register */}
          {storedUser ? (
            <span className="text-gray-800 font-semibold">
              Welcome, {storedUser.name}
            </span>
          ) : (
            <>
              {/* Login button */}
              <Link
                to="/login"
                className="relative px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold shadow hover:scale-105 transition group"
              >
                Login
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/0 opacity-50 blur-md"
                  initial={{ x: "-120%" }}
                  animate={{ x: "120%" }}
                  transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                ></motion.span>
              </Link>

              {/* Register button */}
              <div className="flex items-center gap-2">
                <Link
                  to="/register"
                  className="relative px-4 py-2 rounded-full border-2 border-indigo-500 text-indigo-600 font-semibold bg-white hover:bg-indigo-50 transition group"
                >
                  Register
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-indigo-500 opacity-0 group-hover:opacity-100 transition-all duration-300"
                    style={{ boxShadow: "0 0 10px rgba(99, 102, 241, 0.5)" }}
                  ></motion.div>
                </Link>

                {/* Info Icon for About Page */}
                <button
                  onClick={() => navigate("/about")}
                  className="p-2 rounded-full hover:bg-gray-100 transition"
                  title="About"
                >
                  <FiInfo className="text-indigo-600 w-5 h-5" />
                </button>
              </div>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-3xl text-indigo-600 focus:outline-none"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white/95 shadow-lg px-6 py-4 flex flex-col gap-4"
          >
            {[
              { name: "Home", path: "/" },
              { name: "Create Post", path: "/new" },
              { name: "Features", path: "/features" }, // replaced About with Features
              { name: "Contact", path: "/contact" },
              { name: "Profile", path: "/profile" },
            ].map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="relative text-gray-700 font-medium hover:text-indigo-600 transition group inline-block"
                onClick={() => setMenuOpen(false)}
              >
                <span className="inline-block relative">
                  {item.name}
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
                </span>
              </Link>
            ))}

            {/* ✅ Mobile: If logged in show Welcome, else Login/Register */}
            {storedUser ? (
              <span className="text-gray-800 font-semibold px-4">
                Welcome, {storedUser.name}
              </span>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold shadow hover:scale-105 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>

                <div className="flex items-center gap-2">
                  <Link
                    to="/register"
                    className="px-4 py-2 rounded-full border-2 border-indigo-500 text-indigo-600 font-semibold bg-white hover:bg-indigo-50 transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    Register
                  </Link>
                  <button
                    onClick={() => {
                      navigate("/about");
                      setMenuOpen(false);
                    }}
                    className="p-2 rounded-full hover:bg-gray-100 transition"
                    title="About"
                  >
                    <FiInfo className="text-indigo-600 w-5 h-5" />
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;
