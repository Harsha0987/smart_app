import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <motion.footer
      className="bg-gradient-to-r from-blue-900 via-blue-700 to-cyan-500 text-white py-8 mt-50 font-montserrat"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-6">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            SmartApp
          </span>
        </div>
        {/* Center: All rights reserved */}
        <div className="flex-1 flex justify-center">
          <span className="text-sm text-white/70 text-center">
            &copy; {new Date().getFullYear()} All rights reserved.
          </span>
        </div>
        {/* Right: Socials */}
        <div className="flex gap-5">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-300 transition text-xl"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-300 transition text-xl"
            aria-label="Twitter"
          >
            <FaTwitter />
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-300 transition text-xl"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </motion.footer>
  );
}

export default Footer;
