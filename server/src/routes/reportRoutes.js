import express from "express";
import Report from "../models/Report.js";

const router = express.Router();

// Create report
router.post("/", async (req, res) => {
  try {
    const report = new Report(req.body);
    await report.save();
    res.json({ success: true, message: "🕵️ Suspicious activity reported", report });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get all reports
router.get("/", async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update report
router.put("/:id", async (req, res) => {
  try {
    const updatedReport = await Report.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedReport)
      return res.status(404).json({ success: false, message: "Report not found" });
    res.json({ success: true, message: "✅ Report updated successfully!", report: updatedReport });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete report
router.delete("/:id", async (req, res) => {
  try {
    const deletedReport = await Report.findByIdAndDelete(req.params.id);
    if (!deletedReport)
      return res.status(404).json({ success: false, message: "Report not found" });
    res.json({ success: true, message: "🗑️ Report deleted successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
