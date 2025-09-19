import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

function PostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (file) {
      formData.append("image", file);
    }

    try {
      await axios.post("http://localhost:5000/api/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setShowPopup(true); // Show success popup
      setTimeout(() => {
        setShowPopup(false); // Hide popup after 7 seconds
        setTitle("");
        setContent("");
        setFile(null);
        window.location.reload(); // Reload to show the new post
      }, 7000);
    } catch (error) {
      console.error("Error submitting post:", error);
      alert("Failed to submit post");
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-400 relative">
      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="relative bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl px-10 py-12 w-full max-w-xl flex flex-col gap-6 border border-blue-100"
        initial={{ scale: 0.85, y: 80, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 1.1, type: "spring" }}
      >
        <h2 className="text-3xl font-extrabold text-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 bg-clip-text mb-2 font-montserrat z-10">
          Share Your Thoughts
        </h2>
        <motion.input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-5 py-3 rounded-xl border border-cyan-400 bg-blue-50 focus:ring-2 focus:ring-cyan-400 font-montserrat text-lg z-10"
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8, type: "spring" }}
        />
        <motion.textarea
          placeholder="Write something amazing..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-5 py-3 rounded-xl border border-cyan-400 bg-blue-50 focus:ring-2 focus:ring-cyan-400 font-montserrat text-lg h-32 resize-none z-10"
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8, type: "spring" }}
        />
        <div className="flex flex-col gap-4">
          <label className="text-lg font-semibold text-gray-700">Upload File:</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full px-5 py-3 rounded-xl border border-cyan-400 bg-blue-50 focus:ring-2 focus:ring-cyan-400 font-montserrat text-lg"
          />
        </div>
        <motion.button
          type="submit"
          className="relative px-10 py-4 rounded-full bg-gradient-to-r from-orange-400 via-yellow-300 to-yellow-500 text-blue-900 font-extrabold text-lg shadow-lg hover:shadow-2xl transition-all font-montserrat overflow-hidden block"
          style={{
            boxShadow: "0 4px 24px 0 rgba(255, 200, 0, 0.25)",
            letterSpacing: "0.04em",
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
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
          Post Now
        </motion.button>
      </motion.form>

      {/* Success Popup */}
      {showPopup && (
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-2xl flex flex-col items-center gap-4"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          <FaCheckCircle className="text-green-500 text-6xl" />
          <motion.p
            className="text-lg font-semibold text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Post Submitted Successfully!
          </motion.p>
        </motion.div>
      )}
    </div>
  );
}

export default PostForm;
