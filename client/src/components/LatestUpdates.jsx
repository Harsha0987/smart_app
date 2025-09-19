import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

function LatestUpdates() {
  const [updates, setUpdates] = useState([]);
  const scrollRef = useRef(null);
  const scrollInterval = useRef(null);

  const formatDateTime = (dateString) => {
    if (!dateString) return "Unknown";
    const date = new Date(dateString);
    if (isNaN(date)) return "Invalid date";
    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getLink = (type) => {
    if (type === "event") return "/events";
    if (type === "alert") return "/alerts";
    if (type === "report") return "/reports";
    return "#";
  };

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const [eventsRes, alertsRes, reportsRes] = await Promise.all([
          fetch("http://localhost:5000/api/events").then((res) => res.json()),
          fetch("http://localhost:5000/api/alerts").then((res) => res.json()),
          fetch("http://localhost:5000/api/reports").then((res) => res.json()),
        ]);

        const now = new Date();

        const allEvents = eventsRes.map((e) => ({
          type: "event",
          text: e.text || "No title",
          createdAt: e.date || e.createdAt || new Date().toISOString(),
          creator: e.createdBy || "Event",
        }));

        const validAlerts = alertsRes
          .filter((a) => now - new Date(a.createdAt) < 24 * 60 * 60 * 1000)
          .map((a) => ({
            type: "alert",
            text: a.message || "No details",
            createdAt: a.createdAt,
            creator: a.createdBy || "Alert",
          }));

        const validReports = reportsRes
          .filter((r) => now - new Date(r.createdAt) < 24 * 60 * 60 * 1000)
          .map((r) => ({
            type: "report",
            text: r.description || "No details",
            createdAt: r.createdAt,
            creator: r.anonymous ? "Anonymous" : r.createdBy || "Report",
          }));

        const allUpdates = [...allEvents, ...validAlerts, ...validReports].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setUpdates(allUpdates);
      } catch (err) {
        console.error("Error fetching updates:", err);
      }
    };

    fetchUpdates();
    const interval = setInterval(fetchUpdates, 30000);
    return () => clearInterval(interval);
  }, []);

  // Auto scroll
  useEffect(() => {
    const scrollBox = scrollRef.current;
    if (!scrollBox || updates.length === 0) return;

    const scrollSpeed = 1;
    const intervalTime = 50;

    const startScrolling = () => {
      scrollInterval.current = setInterval(() => {
        if (
          scrollBox.scrollTop + scrollBox.clientHeight >=
          scrollBox.scrollHeight
        ) {
          scrollBox.scrollTop = 0;
        } else {
          scrollBox.scrollTop += scrollSpeed;
        }
      }, intervalTime);
    };

    startScrolling();
    const stopScrolling = () => clearInterval(scrollInterval.current);

    scrollBox.addEventListener("mouseenter", stopScrolling);
    scrollBox.addEventListener("mouseleave", startScrolling);

    return () => {
      stopScrolling();
      scrollBox.removeEventListener("mouseenter", stopScrolling);
      scrollBox.removeEventListener("mouseleave", startScrolling);
    };
  }, [updates]);

  return (
    <div className="flex justify-center my-8 font-poppins">
      <div className="w-full max-w-2xl bg-white/20 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
        <h3 className="text-2xl font-bold text-center text-white bg-yellow-500 py-3 rounded-t-2xl shadow-md">
          🔔 Latest Updates
        </h3>

        <div
          ref={scrollRef}
          className="relative h-96 overflow-y-auto px-6 py-4 flex flex-col items-center space-y-4"
        >
          {updates.length > 0 ? (
            updates.map((u, index) => (
              <div
                key={index}
                className="w-full bg-green-100 rounded-xl shadow-md p-5 border-l-4 border-yellow-500 hover:scale-105 transform transition-all duration-300"
              >
                <p className="text-md font-semibold text-gray-800 mb-1">
                  {u.type === "alert" && "🚨 "}
                  {u.type === "report" && "🕵️ "}
                  {u.type === "event" && "📅 "}
                  {u.creator}: {u.text}
                </p>
                <p className="text-sm text-gray-700 mb-3">
                  🕒 {formatDateTime(u.createdAt)}
                </p>
                <Link
                  to={getLink(u.type)}
                  className="inline-block px-4 py-2 bg-yellow-500 text-gray-900 font-semibold rounded-lg shadow-md hover:bg-yellow-600 hover:scale-105 transform transition-all duration-300"
                >
                  Click here
                </Link>
              </div>
            ))
          ) : (
            <p className="text-gray-500 mt-20">No updates yet</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default LatestUpdates;
