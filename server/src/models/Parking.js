import mongoose from "mongoose";

const parkingSchema = new mongoose.Schema({
  carNumber: { type: String, required: true },
  pillarNumber: { type: String, required: true },
  owner: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Parking", parkingSchema);
