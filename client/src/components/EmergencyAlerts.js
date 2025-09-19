import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function EmergencyAlerts() {
  const [alerts, setAlerts] = useState([]);
  const [form, setForm] = useState({ type: "", message: "", location: "" });
  const [editingId, setEditingId] = useState(null);
  const [popup, setPopup] = useState({ show: false, message: "" });
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/alerts");
      setAlerts(res.data);
    } catch (err) {
      console.error("Error fetching alerts:", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { type, message, location } = form;
    if (!type || !message || !location) return;

    try {
      let res;
      if (editingId) {
        // Edit existing alert
        res = await axios.put(`http://localhost:5000/api/alerts/${editingId}`, form);
        if (res.data.success) {
          setPopup({ show: true, message: "✅ Alert updated successfully!" });
        } else {
          throw new Error(res.data.message || "Failed to update");
        }
      } else {
        // Add new alert
        res = await axios.post("http://localhost:5000/api/alerts", {
          ...form,
          createdBy: "Harsha",
          createdAt: new Date().toISOString(),
        });

        if (res.status === 200 || res.status === 201) {
          setPopup({ show: true, message: "✅ Alert sent successfully!" });
        } else {
          throw new Error("Failed to save alert");
        }
      }

      // Reset form & editing state
      setForm({ type: "", message: "", location: "" });
      setEditingId(null);

      // Refresh alerts list immediately
      await fetchAlerts();

      // Hide popup after 2 seconds
      setTimeout(() => setPopup({ show: false, message: "" }), 2000);
    } catch (err) {
      console.error("Error saving alert:", err);
      setPopup({ show: true, message: "❌ Failed to save alert" });
      setTimeout(() => setPopup({ show: false, message: "" }), 2000);
    }
  };

  const handleEdit = (alert) => {
    setForm({ type: alert.type, message: alert.message, location: alert.location });
    setEditingId(alert._id);
  };

  const handleCancel = () => {
    setForm({ type: "", message: "", location: "" });
    setEditingId(null);
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    try {
      const res = await axios.delete(`http://localhost:5000/api/alerts/${confirmDelete}`);
      if (res.status === 200) {
        setPopup({ show: true, message: "🗑️ Alert deleted successfully!" });
        fetchAlerts();
      } else {
        throw new Error("Delete failed");
      }
    } catch (err) {
      console.error("Error deleting alert:", err);
      setPopup({ show: true, message: "❌ Failed to delete alert" });
    } finally {
      setConfirmDelete(null);
      setTimeout(() => setPopup({ show: false, message: "" }), 2000);
    }
  };

  const formatDateTime = (isoString) => {
    if (!isoString) return "Unknown";
    const date = new Date(isoString);
    return isNaN(date) ? "Invalid date" : date.toLocaleString("en-IN");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 via-orange-100 to-yellow-100 p-6 relative">

      {/* Popup */}
      {popup.show && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center z-50"
        >
          <div className="bg-white shadow-2xl rounded-2xl p-6 text-center">
            <p className="text-xl font-bold">{popup.message}</p>
          </div>
        </motion.div>
      )}

      {/* Confirm Delete */}
      {confirmDelete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <div className="bg-white rounded-xl p-6 shadow-xl text-center">
            <p className="text-lg mb-4">⚠️ Are you sure you want to delete?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8"
      >
        <h1 className="text-3xl font-bold text-red-600 text-center mb-6">🚨 Emergency Alerts</h1>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 mb-8 bg-gray-900 text-white p-6 rounded-xl"
        >
          <input
            type="text"
            name="type"
            value={form.type}
            onChange={handleChange}
            placeholder="Type (Fire, Theft, Accident...)"
            className="p-3 rounded-lg border border-gray-600 bg-gray-800 focus:ring-2 focus:ring-red-400"
            required
          />
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location"
            className="p-3 rounded-lg border border-gray-600 bg-gray-800 focus:ring-2 focus:ring-red-400"
            required
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Enter alert details..."
            rows="3"
            className="p-3 rounded-lg border border-gray-600 bg-gray-800 focus:ring-2 focus:ring-red-400"
            required
          />
          <div className="flex gap-2">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold rounded-lg"
            >
              {editingId ? "Save Changes" : "Send Alert"}
            </motion.button>
            {editingId && (
              <motion.button
                type="button"
                onClick={handleCancel}
                whileHover={{ scale: 1.05 }}
                className="px-6 py-3 bg-gray-500 text-white font-bold rounded-lg"
              >
                Cancel
              </motion.button>
            )}
          </div>
        </form>

        {/* Alerts List */}
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Alerts</h2>
        <div className="space-y-4">
          {alerts.length === 0 ? (
            <p className="text-gray-500">No alerts yet</p>
          ) : (
            alerts.map((alert) => (
              <div key={alert._id} className="bg-red-50 p-4 rounded-xl shadow relative">
                <h3 className="text-lg font-bold text-red-700">{alert.type} 🚨</h3>
                <p>{alert.message}</p>
                <p className="text-sm text-gray-600">📍 {alert.location}</p>
                <p className="text-sm text-gray-600">🕒 {formatDateTime(alert.createdAt)}</p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleEdit(alert)}
                    className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setConfirmDelete(alert._id)}
                    className="px-3 py-1 bg-red-500 text-white text-sm rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default EmergencyAlerts;
