import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  text: { type: String, required: true },
  date: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Event", eventSchema);
