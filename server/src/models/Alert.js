import mongoose from "mongoose";

const alertSchema = new mongoose.Schema({
  type: { type: String, required: true }, // fire, theft, medical, etc.
  message: { type: String, required: true },
  createdBy: { type: String, required: true }, // user id / name
  location: { type: String }, // optional GPS or landmark
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Alert", alertSchema);
