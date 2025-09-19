// src/components/Reports.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function Reports() {
  const [reports, setReports] = useState([]);
  const [form, setForm] = useState({
    description: "",
    image: "",
    location: "",
    anonymous: false,
    createdBy: "Ganesh",
  });
  const [editingId, setEditingId] = useState(null);
  const [popup, setPopup] = useState({ show: false, message: "" });
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/reports`);
      setReports(res.data);
    } catch (err) {
      console.error("Error fetching reports:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Edit / Update report
        await axios.put(`${process.env.REACT_APP_API_URL}/api/reports/${editingId}`, form);
        setPopup({ show: true, message: "✅ Report updated successfully!" });
      } else {
        // Create new report
        await axios.post(`${process.env.REACT_APP_API_URL}/api/reports`, {
          ...form,
          createdAt: new Date().toISOString(),
        });
        setPopup({ show: true, message: "✅ Report sent successfully!" });
      }

      setForm({
        description: "",
        image: "",
        location: "",
        anonymous: false,
        createdBy: "Ganesh",
      });
      setEditingId(null);
      fetchReports();

      setTimeout(() => setPopup({ show: false, message: "" }), 2000);
    } catch (err) {
      console.error("Error saving report:", err);
      setPopup({ show: true, message: "❌ Failed to save report!" });
      setTimeout(() => setPopup({ show: false, message: "" }), 2000);
    }
  };

  const handleEdit = (report) => {
    setForm({
      description: report.description,
      image: report.image,
      location: report.location,
      anonymous: report.anonymous,
      createdBy: report.createdBy,
    });
    setEditingId(report._id);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/reports/${confirmDelete}`);
      setConfirmDelete(null);
      setPopup({ show: true, message: "🗑️ Report deleted successfully!" });
      fetchReports();
      setTimeout(() => setPopup({ show: false, message: "" }), 2000);
    } catch (err) {
      console.error("Error deleting report:", err);
      setPopup({ show: true, message: "❌ Failed to delete report!" });
      setTimeout(() => setPopup({ show: false, message: "" }), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6 relative">
      {/* Popup */}
      {popup.show && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
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
        <h1 className="text-3xl font-bold text-blue-700 text-center mb-6">
          🕵️ Suspicious Activity Reports
        </h1>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 mb-8 bg-blue-100 p-6 rounded-xl"
        >
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe the suspicious activity..."
            rows="3"
            className="p-3 rounded-lg border border-blue-300 focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location (Optional)"
            className="p-3 rounded-lg border border-blue-300 focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="Image URL (Optional)"
            className="p-3 rounded-lg border border-blue-300 focus:ring-2 focus:ring-blue-400"
          />
          <label className="flex items-center gap-2 text-gray-700">
            <input
              type="checkbox"
              name="anonymous"
              checked={form.anonymous}
              onChange={handleChange}
            />
            Report Anonymously
          </label>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold rounded-lg"
          >
            {editingId ? "Save Changes" : "Submit Report"}
          </motion.button>
        </form>

        {/* Reports List */}
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Reports</h2>
        <div className="space-y-4">
          {reports.map((report) => (
            <div key={report._id} className="bg-blue-50 p-4 rounded-xl shadow relative">
              <h3 className="text-lg font-bold text-blue-700">
                {report.anonymous ? "Anonymous" : report.createdBy} 🕵️
              </h3>
              <p>{report.description}</p>
              {report.image && (
                <img src={report.image} alt="report" className="mt-2 rounded-lg max-h-48 object-cover w-full" />
              )}
              {report.location && <p className="text-sm text-gray-600">📍 {report.location}</p>}
              <p className="text-sm text-gray-600">
                🕒 {new Date(report.createdAt).toLocaleString()}
              </p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEdit(report)}
                  className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={() => setConfirmDelete(report._id)}
                  className="px-3 py-1 bg-red-500 text-white text-sm rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default Reports;
