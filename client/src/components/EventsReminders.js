// client/src/components/EventsReminders.js
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EventsReminders({ onEventsUpdate }) {
  const [events, setEvents] = useState([]);
  const [input, setInput] = useState("");
  const [date, setDate] = useState("");
  const [editingEvent, setEditingEvent] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL;

  const fetchEvents = useCallback(async () => {
    try {
      const res = await axios.get(API_URL);
      setEvents(res.data);
      if (onEventsUpdate) onEventsUpdate(res.data); 
    } catch (err) {
      console.error("Error fetching events:", err);
      toast.error("Failed to load events");
    }
  }, [onEventsUpdate]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  
  const showSuccess = (msg) => toast.success(`✅ ${msg}`, { position: "top-center", autoClose: 2000 });
  const showError = (msg) => toast.error(`❌ ${msg}`, { position: "top-center", autoClose: 3000 });


  const handleAddOrSave = async () => {
    if (input.trim() === "" || date === "") {
      showError("Please provide event title and date/time");
      return;
    }

    try {
      const payload = { text: input.trim(), date: new Date(date).toISOString() };

      if (editingEvent) {
        
        const res = await axios.put(`${API_URL}/${editingEvent._id}`, payload);
       
        setEvents((prev) => prev.map((e) => (e._id === editingEvent._id ? res.data : e)));
        setEditingEvent(null);
        showSuccess("Event updated");
        if (onEventsUpdate) onEventsUpdate(await fetchLatestEvents());
      } else {
      
        const res = await axios.post(API_URL, payload);
       
        setEvents((prev) => [res.data, ...prev]);
        showSuccess("Event created");
        if (onEventsUpdate) onEventsUpdate(await fetchLatestEvents());
      }

     
      setInput("");
      setDate("");
    } catch (err) {
      console.error("Error saving event:", err);
      showError("Failed to save event");
    }
  };

  // helper to fetch fresh events and return them
  const fetchLatestEvents = async () => {
    try {
      const r = await axios.get(API_URL);
      setEvents(r.data);
      return r.data;
    } catch (err) {
      console.error(err);
      return events;
    }
  };

  // Start editing: populate inputs
  const startEdit = (ev) => {
    setEditingEvent(ev);
    setInput(ev.text || ev.title || "");
    // convert server date -> datetime-local format: "YYYY-MM-DDTHH:mm"
    try {
      const iso = new Date(ev.date || ev.eventDate || ev.createdAt).toISOString();
      setDate(iso.slice(0, 16));
    } catch {
      setDate("");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Confirm delete: open modal
  const confirmDelete = (ev) => {
    setEventToDelete(ev);
    setShowDeletePopup(true);
  };

  // Do delete
  const handleDelete = async () => {
    if (!eventToDelete) return;
    try {
      await axios.delete(`${API_URL}/${eventToDelete._id}`);
      // remove from UI
      setEvents((prev) => prev.filter((e) => e._id !== eventToDelete._id));
      setShowDeletePopup(false);
      showSuccess("Event deleted");
      if (onEventsUpdate) onEventsUpdate(await fetchLatestEvents());
    } catch (err) {
      console.error("Error deleting event:", err);
      showError("Failed to delete event");
    } finally {
      setEventToDelete(null);
      setShowDeletePopup(false);
    }
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditingEvent(null);
    setInput("");
    setDate("");
  };

  return (
    <>
      <ToastContainer />

      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex justify-center items-start p-6 pt-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-6"
        >
          <h2 className="text-2xl font-bold text-indigo-700 text-center mb-4">📅 Events & Reminders</h2>

          {/* Form */}
          <div className="flex flex-col md:flex-row gap-3 mb-6">
            <input
              placeholder="Event title"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-3 rounded-lg border border-gray-300"
            />
            <input
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="p-3 rounded-lg border border-gray-300"
            />

            <div className="flex gap-2">
              <button
                onClick={handleAddOrSave}
                className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-md text-sm shadow"
              >
                {editingEvent ? "Save" : "Add"}
              </button>

              {editingEvent && (
                <button
                  onClick={cancelEdit}
                  className="px-3 py-2 bg-gray-200 text-gray-700 rounded-md text-sm"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>

          {/* Events List */}
          <div className="space-y-3">
            {events.length === 0 ? (
              <p className="text-center text-gray-500">No events yet</p>
            ) : (
              events.map((ev) => (
                <motion.div
                  key={ev._id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-start justify-between bg-indigo-50 border border-indigo-100 rounded-lg p-3"
                >
                  <div>
                    <div className="flex items-baseline gap-3">
                      <h3 className="font-semibold text-indigo-700">{ev.text}</h3>
                      <span className="text-xs text-gray-500">
                        {ev.date ? new Date(ev.date).toLocaleString() : "No date"}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Posted: {ev.createdAt ? new Date(ev.createdAt).toLocaleString() : "—"}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => startEdit(ev)}
                      className="text-xs px-2 py-1 rounded-md bg-white/60 backdrop-blur-sm border border-white/30 text-indigo-700 hover:shadow"
                      title="Edit"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => confirmDelete(ev)}
                      className="text-xs px-2 py-1 rounded-md bg-white/60 backdrop-blur-sm border border-white/30 text-red-600 hover:shadow"
                      title="Delete"
                    >
                      🗑 Delete
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>

      {/* Delete confirmation modal */}
      <AnimatePresence>
        {showDeletePopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.18 }}
              className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full text-center"
            >
              <h3 className="text-lg font-semibold text-red-600 mb-2">⚠️ Confirm delete</h3>
              <p className="text-gray-700 mb-4">
                Are you sure you want to delete <b>{eventToDelete?.text}</b>? This cannot be undone.
              </p>

              <div className="flex justify-center gap-3">
                <button
                  onClick={() => {
                    setShowDeletePopup(false);
                    setEventToDelete(null);
                  }}
                  className="px-4 py-2 rounded-md bg-gray-200"
                >
                  Cancel
                </button>

                <button
                  onClick={handleDelete}
                  className="px-4 py-2 rounded-md bg-red-600 text-white"
                >
                  Yes, delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default EventsReminders;
