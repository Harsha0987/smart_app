// SOSButton.jsx
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SOSButton() {
  const handleClick = () => {
    // You can call your API here to send the emergency alert
    // Example: fetch("/api/send-emergency-alert", { method: "POST" })

    // Show notification
    toast.success("🚨 Emergency alert sent successfully!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <div className="flex flex-col items-center my-12">
      <button
        onClick={handleClick}
        className="bg-red-600 hover:bg-red-700 text-white rounded-full w-40 h-40 flex flex-col items-center justify-center shadow-xl transform hover:scale-105 transition-all duration-300"
      >
        <span className="text-4xl font-extrabold tracking-wide">SOS</span>
        <span className="text-sm font-medium mt-1 opacity-90">Emergency</span>
      </button>
      <ToastContainer />
    </div>
  );
}

export default SOSButton;
