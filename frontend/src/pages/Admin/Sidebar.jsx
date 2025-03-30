import React from "react";
import { useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-800 text-white w-64 p-6 space-y-4 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <ul className="space-y-2">
        <li>
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="w-full text-left px-4 py-2 rounded hover:bg-gray-700 transition"
          >
            Dashboard
          </button>
        </li>
        <li>
          <button
            onClick={() => navigate("/admin/addtemplate")}
            className="w-full text-left px-4 py-2 rounded hover:bg-gray-700 transition"
          >
            Add Template
          </button>
        </li>
        <li>
          <button
            onClick={() => navigate("/admin/vieworders")}
            className="w-full text-left px-4 py-2 rounded hover:bg-gray-700 transition"
          >
            View Orders
          </button>
        </li>
        <li>
          <button
            onClick={() => navigate("/admin/contactus")}
            className="w-full text-left px-4 py-2 rounded hover:bg-gray-700 transition"
          >
            Contact Us
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
