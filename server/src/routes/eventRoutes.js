// server/src/routes/eventRoutes.js
import express from "express";
import Event from "../models/Event.js"; // ensure model path

const router = express.Router();

// GET all events (newest first)
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

// POST new event
router.post("/", async (req, res) => {
  try {
    const { text, date } = req.body;
    if (!text || !date) return res.status(400).json({ error: "Text and date required" });

    const event = new Event({
      text,
      date: new Date(date),
      createdAt: new Date(),
    });
    const saved = await event.save();
    res.json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create event" });
  }
});

// PUT update event
router.put("/:id", async (req, res) => {
  try {
    const { text, date } = req.body;
    const updated = await Event.findByIdAndUpdate(
      req.params.id,
      { text, date: new Date(date) },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Event not found" });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update event" });
  }
});

// DELETE event
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Event.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Event not found" });
    res.json({ message: "Event deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete event" });
  }
});

export default router;
