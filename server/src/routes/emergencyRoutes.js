import express from "express";
import Alert from "../models/Alert.js";

const router = express.Router();

// One-click emergency help
router.post("/panic", async (req, res) => {
  try {
    const alert = new Alert({
      type: "Emergency Help",
      message: "🚨 SOS! Immediate help required!",
      createdBy: req.body.createdBy,
      location: req.body.location || "Unknown"
    });
    await alert.save();
    res.json({ success: true, message: "🚨 SOS Alert sent to all neighbors", alert });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
