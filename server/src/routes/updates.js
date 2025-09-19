import express from "express";
import Event from "../models/Event.js";
import Alert from "../models/Alert.js";
import Report from "../models/Report.js";

const router = express.Router();

// Fetch combined updates
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    const alerts = await Alert.find().sort({ createdAt: -1 });
    const reports = await Report.find().sort({ createdAt: -1 });

    // Normalize into one array
    const updates = [
      ...events.map((e) => ({
        type: "event",
        text: e.text,
        eventDate: e.date,
        createdAt: e.createdAt,
      })),
      ...alerts.map((a) => ({
        type: "alert",
        text: a.text,
        createdAt: a.createdAt,
      })),
      ...reports.map((r) => ({
        type: "report",
        text: r.text,
        createdAt: r.createdAt,
      })),
    ];

    // sort by posted date
    updates.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json(updates);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch updates" });
  }
});

export default router;
