import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  description: { type: String, required: true },
  image: { type: String }, // store image URL if uploaded
  createdBy: { type: String, required: true },
  location: { type: String },
  anonymous: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Report", reportSchema);
