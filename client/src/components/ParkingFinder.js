// src/pages/ParkFinder.js
import React, { useState } from "react";

const initialSlots = [
  { id: 1, pillar: "A1", occupiedBy: "Alice" },
  { id: 2, pillar: "A2", occupiedBy: null },
  { id: 3, pillar: "B1", occupiedBy: "Bob" },
  { id: 4, pillar: "B2", occupiedBy: null },
  { id: 5, pillar: "C1", occupiedBy: null },
  { id: 6, pillar: "C2", occupiedBy: "You" },
  { id: 7, pillar: "C3", occupiedBy: "Ramesh" },
  { id: 8, pillar: "D1", occupiedBy: null },
  { id: 9, pillar: "D2", occupiedBy: "Sita" },
  { id: 10, pillar: "E1", occupiedBy: null },
  { id: 11, pillar: "E2", occupiedBy: "Rahul" },
  { id: 12, pillar: "F1", occupiedBy: null },
  { id: 13, pillar: "F2", occupiedBy: "Neha" },
  { id: 14, pillar: "G1", occupiedBy: null },
  { id: 15, pillar: "G2", occupiedBy: "Manish" },
];

function ParkFinder() {
  const [slots, setSlots] = useState(initialSlots);
  const [search, setSearch] = useState("");
  const [showEmpty, setShowEmpty] = useState(false);

  const handleReserve = (id) => {
    setSlots(
      slots.map((slot) =>
        slot.id === id && slot.occupiedBy === null
          ? { ...slot, occupiedBy: "You", reserved: true }
          : slot
      )
    );
  };

  const handleUndo = (id) => {
    setSlots(
      slots.map((slot) =>
        slot.id === id && slot.occupiedBy === "You" && slot.reserved
          ? { ...slot, occupiedBy: null, reserved: false }
          : slot
      )
    );
  };

  const filteredSlots = slots.filter((slot) => {
    if (showEmpty && slot.occupiedBy !== null) return false;
    if (search && !slot.pillar.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-6">
      {/* Title */}
      <div className="pt-24 text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Basement Parking Finder</h1>
      </div>

      {/* Filters */}
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by pillar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={() => setShowEmpty(!showEmpty)}
          className={`p-3 rounded-xl font-semibold ${
            showEmpty ? "bg-green-500 text-white" : "bg-gray-300 text-gray-800"
          }`}
        >
          {showEmpty ? "Showing Empty Slots" : "Show Only Empty Slots"}
        </button>
      </div>

      {/* Parking slots grid */}
      <div className="flex-1 grid grid-cols-3 gap-6 max-w-4xl mx-auto">
        {filteredSlots.map((slot) => {
          const isOccupied = slot.occupiedBy !== null;
          const isYou = slot.occupiedBy === "You";
          return (
            <div
              key={slot.id}
              className={`p-4 rounded-lg text-center font-semibold shadow-md relative ${
                isYou
                  ? "bg-purple-300 text-white"
                  : isOccupied
                  ? "bg-red-200 text-red-800"
                  : "bg-green-200 text-green-800"
              }`}
            >
              <div className="text-xl">{slot.pillar}</div>
              <div className="text-sm mt-2">
                {isOccupied ? slot.occupiedBy : "Empty"}
              </div>

              {/* Reserve / Undo buttons */}
              {!isOccupied && (
                <button
                  onClick={() => handleReserve(slot.id)}
                  className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs px-2 py-1 rounded hover:bg-blue-600"
                >
                  Reserve
                </button>
              )}
              {isYou && slot.reserved && (
                <button
                  onClick={() => handleUndo(slot.id)}
                  className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600"
                >
                  Undo
                </button>
              )}
            </div>
          );
        })}
        {filteredSlots.length === 0 && (
          <div className="col-span-3 text-center text-gray-500">
            No slots found
          </div>
        )}
      </div>
    </div>
  );
}

export default ParkFinder;
