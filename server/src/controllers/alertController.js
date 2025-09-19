import Alert from "../models/Alert.js";

export const getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find().sort({ createdAt: -1 });
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch alerts" });
  }
};

export const createAlert = async (req, res) => {
  try {
    const { type, message, location, createdBy } = req.body;
    const alert = new Alert({ type, message, location, createdBy });
    await alert.save();
    res.status(201).json(alert);
  } catch (err) {
    res.status(500).json({ error: "Failed to create alert" });
  }
};
