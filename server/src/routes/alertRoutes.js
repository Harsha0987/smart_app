import express from "express";
import Alert from "../models/Alert.js";
const router = express.Router();

// Create alert
router.post("/", async (req, res) => {
  try {
    const alert = new Alert(req.body);
    await alert.save();
    res.json({ success: true, message: "🚨 Alert sent successfully!", alert });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get all alerts
router.get("/", async (req, res) => {
  try {
    const alerts = await Alert.find().sort({ createdAt: -1 });
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update alert
router.put("/:id", async (req, res) => {
  try {
    const updatedAlert = await Alert.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedAlert)
      return res.status(404).json({ success: false, message: "Alert not found" });
    res.json({ success: true, message: "✅ Alert updated successfully!", alert: updatedAlert });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete alert
router.delete("/:id", async (req, res) => {
  try {
    const deletedAlert = await Alert.findByIdAndDelete(req.params.id);
    if (!deletedAlert)
      return res.status(404).json({ success: false, message: "Alert not found" });
    res.json({ success: true, message: "🗑️ Alert deleted successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
