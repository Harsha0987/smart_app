import express from "express";
import Parking from "../models/Parking.js";

const router = express.Router();

// Register car parking
router.post("/", async (req, res) => {
  try {
    const parking = new Parking(req.body);
    await parking.save();
    res.json({ success: true, message: "🚗 Car parking saved", parking });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Find car by pillar number
router.get("/:pillarNumber", async (req, res) => {
  try {
    const pillar = req.params.pillarNumber;
    const cars = await Parking.find({ pillarNumber: pillar });
    res.json(cars);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
