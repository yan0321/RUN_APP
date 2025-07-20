import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import StravaCallback from "./pages/StravaCallback";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Navbar />
      <div className="max-w-5xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/strava-callback" element={<StravaCallback />} />
        </Routes>
      </div>
    </div>
  );
}
export default App;
