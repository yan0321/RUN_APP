import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow mb-6">
      <div className="max-w-5xl mx-auto px-4 py-2 flex justify-between items-center">
        <Link to="/dashboard" className="text-xl font-semibold text-blue-600">
          RUN_APP
        </Link>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `px-3 py-1 rounded ${isActive ? "bg-blue-600 text-white" : "text-gray-700"}`
          }
        >
          Dashboard
        </NavLink>
      </div>
    </nav>
  );
} 