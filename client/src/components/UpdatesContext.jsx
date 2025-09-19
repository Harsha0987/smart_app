import React, { createContext, useContext, useState, useEffect } from "react";

const UpdatesContext = createContext();

export const useUpdates = () => useContext(UpdatesContext);

export const UpdatesProvider = ({ children }) => {
  const [updates, setUpdates] = useState([]);

  // Initial load from backend
  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const res = await fetch("/api/updates");
        const data = await res.json();
        setUpdates(data);
      } catch (err) {
        console.error("Error fetching updates:", err);
      }
    };
    fetchUpdates();
  }, []);

  // Add new update instantly
  const addUpdate = (newUpdate) => {
    setUpdates((prev) => [newUpdate, ...prev]);
  };

  return (
    <UpdatesContext.Provider value={{ updates, addUpdate }}>
      {children}
    </UpdatesContext.Provider>
  );
};
