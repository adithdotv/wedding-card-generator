import React from "react";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      navigate("/adminlogin");
      localStorage.removeItem("adminToken")
    }
  };

  return (
    <nav className="bg-white text-gray-800 p-4 shadow-md flex justify-between items-center">
      <div className="text-2xl font-semibold">Admin Dashboard</div>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-800 transition"
      >
        Logout
      </button>
    </nav>
  );
};

export default AdminNavbar;
