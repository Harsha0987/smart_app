import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
        email,
        password,
      });

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        toast.success("✅ Login Successful!", {
          duration: 3000,
          position: "top-center",
        });

        setTimeout(() => {
          navigate("/profile");
        }, 1500);
      } else {
        toast.error(res.data.message || "Login failed!");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-800 via-indigo-600 to-blue-400">
      <Toaster />

      <motion.div
        className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl px-10 py-12 w-full max-w-md"
        initial={{ scale: 0.85, y: 80, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ duration: 1, type: "spring" }}
      >
        <h2 className="text-3xl font-extrabold text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text mb-6 text-center">
          Welcome Back
        </h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          {/* Email Field */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-5 py-3 rounded-xl border border-indigo-400 bg-indigo-50 focus:ring-2 focus:ring-indigo-400 text-lg"
          />

          {/* Password Field with Monkey */}
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-5 py-3 rounded-xl border border-indigo-400 bg-indigo-50 focus:ring-2 focus:ring-indigo-400 text-lg pr-12"
            />
            <span
              className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl cursor-pointer select-none"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙉" : "🙈"}
            </span>
          </div>

          {/* Login Button */}
          <motion.button
            type="submit"
            className="relative px-10 py-3 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-extrabold text-lg shadow-lg hover:shadow-2xl transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Login
          </motion.button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-500 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Login;
