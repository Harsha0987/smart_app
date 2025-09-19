// server/routes/events.js
const express = require("express");
const router = express.Router();
const Event = require("../models/Event"); // your Mongoose model

// Get all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ postedAt: -1 }); // newest first
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

// Add new event
// server/routes/events.js
router.post("/", async (req, res) => {
  try {
    const { text, date } = req.body;
    if (!text || !date) {
      return res.status(400).json({ error: "Text and Date are required" });
    }

    const event = new Event({
      text,
      date: new Date(date),
      postedAt: new Date()   // ✅ make sure timestamp is always set
    });

    const saved = await event.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: "Failed to save event" });
  }
});
// UPDATE event by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // return updated version
    );
    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(updatedEvent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE event by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
