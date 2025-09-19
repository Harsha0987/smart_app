import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      if (res.data.success) {
        toast.success("🎉 Registration Successful!", {
          duration: 3000,
          position: "top-center",
        });

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error(res.data.message || "Registration failed!", {
          duration: 3000,
          position: "top-center",
        });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed!", {
        duration: 3000,
        position: "top-center",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-400">
      <Toaster /> 

      <motion.div
        className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl px-10 py-12 w-full max-w-md"
        initial={{ scale: 0.85, y: 80, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ duration: 1, type: "spring" }}
      >
        <h2 className="text-3xl font-extrabold text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text mb-6 text-center">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-5 py-3 rounded-xl border border-indigo-400 bg-indigo-50 focus:ring-2 focus:ring-indigo-400 text-lg"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-5 py-3 rounded-xl border border-indigo-400 bg-indigo-50 focus:ring-2 focus:ring-indigo-400 text-lg"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-5 py-3 rounded-xl border border-indigo-400 bg-indigo-50 focus:ring-2 focus:ring-indigo-400 text-lg"
          />
          <motion.button
            type="submit"
            className="relative px-10 py-3 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-extrabold text-lg shadow-lg hover:shadow-2xl transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Register
          </motion.button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-500 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Register;
