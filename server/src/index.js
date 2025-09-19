import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// Routes
import postRoutes from "./routes/postRoutes.js";
import alertRoutes from "./routes/alertRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import emergencyRoutes from "./routes/emergencyRoutes.js";
import parkingRoutes from "./routes/parkingRoutes.js";
import updatesRoutes from "./routes/updates.js";
import authRoutes from "./routes/authRoutes.js"; // 🔹 New route for Register/Login

dotenv.config();
const app = express();

// =======================
// Middleware
// =======================
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // Serve uploaded files

// =======================
// API Routes
// =======================
app.use("/api/posts", postRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/emergency", emergencyRoutes);
app.use("/api/parking", parkingRoutes);
app.use("/api/updates", updatesRoutes);
app.use("/api/auth", authRoutes); // ✅ Register/Login API
app.use("/api/posts", postRoutes);
app.use("/api/alerts", alertRoutes);

// ✅ Test route for frontend check
app.get("/api/test", (req, res) => {
  res.json({ message: "✅ Backend is working fine!" });
});

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Smart App Backend!");
});

// =======================
// MongoDB Connection
// =======================
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/smartdb";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// =======================
// Start Server
// =======================
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

