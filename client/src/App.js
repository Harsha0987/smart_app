import React, { useEffect} from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import StackingCards from "./components/StackingCards";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import About from "./components/About";
import Contact from "./components/Contact";
import Profile from "./components/Profile";
import EmergencyAlerts from "./components/EmergencyAlerts";
import Reports from "./components/Reports";
import EventsReminders from "./components/EventsReminders";
import CommunityFeatures from "./components/CommunityFeatures";
import PanicButton from "./components/PanicButton";
import LatestUpdates from "./components/LatestUpdates"; 
import GroupChat from "./components/GroupChat";
import ParkingFinder from "./components/ParkingFinder";

function App() {
 

  useEffect(() => {
  fetch(`${process.env.REACT_APP_API_URL}/api/test`)
    .then((res) => res.json())
    .then((data) => console.log("✅ Backend says:", data))
    .catch((err) => console.error("❌ Error fetching test message:", err));
}, []);


  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      <Navbar />

      <div className="flex-1 flex flex-col">
        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <>
                <Hero />

                {/* ✅ Latest Updates Section */}
                <LatestUpdates />

                {/* ✅ Panic Button always visible */}
                <PanicButton />

                <div className="p-6 text-center bg-gray-100">
                  
                </div>

                <StackingCards />
                <PostList />
                <EmergencyAlerts />

                {/* ✅ Community Features section */}
                <CommunityFeatures />
              </>
            }
          />

          {/* Other Pages */}
          <Route path="/new" element={<PostForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/features" element={<CommunityFeatures />} />


          {/* Extra Features */}
          <Route path="/reports" element={<Reports />} /> {/* Suspicious Reports */}
          <Route path="/events" element={<EventsReminders />} /> {/* Events + Reminders */}
          <Route path="/chat" element={<GroupChat />} /> {/* placeholder */}
           <Route path="/parking" element={<ParkingFinder />} /> {/* placeholder */}
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
