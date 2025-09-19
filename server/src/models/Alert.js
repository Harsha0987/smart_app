import mongoose from "mongoose";

const alertSchema = new mongoose.Schema({
  type: { type: String, required: true },
  message: { type: String, required: true },
  createdBy: { type: String, required: true }, 
  location: { type: String }, 
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Alert", alertSchema);
