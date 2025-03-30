import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./Sidebar";
import AdminNavbar from "./Navbar";

const templates = [
  {
    id: 1,
    name: "Wedding Bliss",
    price: "$50",
    description: "A beautiful wedding template.",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Corporate Event",
    price: "$70",
    description: "Perfect for corporate meetings.",
    image: "https://via.placeholder.com/150",
  },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [showTemplates, setShowTemplates] = useState(false);
  const [templateList, setTemplateList] = useState(templates);
  const [isEditing, setIsEditing] = useState(false);
  const [editTemplate, setEditTemplate] = useState(null);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      navigate("/adminlogin");
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this template?")) {
      setTemplateList(templateList.filter((template) => template.id !== id));
    }
  };

  const handleEdit = (template) => {
    setIsEditing(true);
    setEditTemplate(template);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setTemplateList((prev) =>
      prev.map((item) =>
        item.id === editTemplate.id ? editTemplate : item
      )
    );
    setIsEditing(false);
    setEditTemplate(null);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <AdminNavbar />

        {/* Dashboard Content */}
        <div className="p-6 bg-gray-100 flex-1">
          <h3 className="text-xl font-bold mb-4">
            Welcome to the Admin Dashboard
          </h3>
          <div className="flex gap-4 mb-6">
            <div className="bg-white p-4 rounded shadow-md flex-1 text-center">
              <h4 className="text-lg font-semibold">Total Orders</h4>
              <p className="text-3xl">120</p>
            </div>
            <div className="bg-white p-4 rounded shadow-md flex-1 text-center">
              <h4 className="text-lg font-semibold">Total Templates</h4>
              <p className="text-3xl">{templateList.length}</p>
            </div>
          </div>
          <button
            onClick={() => setShowTemplates(!showTemplates)}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-800 transition mb-6"
          >
            {showTemplates ? "Hide Templates" : "View Templates Available"}
          </button>

          {showTemplates && (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded shadow-md">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border">Image</th>
                    <th className="px-4 py-2 border">Name</th>
                    <th className="px-4 py-2 border">Price</th>
                    <th className="px-4 py-2 border">Description</th>
                    <th className="px-4 py-2 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {templateList.map((template) => (
                    <tr key={template.id}>
                      <td className="px-4 py-2 border">
                        <img
                          src={template.image}
                          alt={template.name}
                          className="h-16 w-16 rounded"
                        />
                      </td>
                      <td className="px-4 py-2 border">{template.name}</td>
                      <td className="px-4 py-2 border">{template.price}</td>
                      <td className="px-4 py-2 border">{template.description}</td>
                      <td className="px-4 py-2 border space-x-2">
                        <button
                          onClick={() => handleEdit(template)}
                          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-800"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(template.id)}
                          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-800"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {isEditing && (
            <form
              onSubmit={handleEditSubmit}
              className="bg-white p-4 rounded shadow-md mt-6"
            >
              <h4 className="text-lg font-semibold mb-4">Edit Template</h4>
              <label>Name of Template</label>
              <input
                type="text"
                value={editTemplate.name}
                onChange={(e) =>
                  setEditTemplate({ ...editTemplate, name: e.target.value })
                }
                className="w-full p-2 mb-2 border rounded"
              />
              <label>Upload Template</label>
              <input
                type="file"
                className="w-full p-2 mb-2 border rounded"
              />
              <label>Price</label>
              <input
                type="text"
                value={editTemplate.price}
                onChange={(e) =>
                  setEditTemplate({ ...editTemplate, price: e.target.value })
                }
                className="w-full p-2 mb-2 border rounded"
              />
              <label>Description</label>
              <textarea
                value={editTemplate.description}
                onChange={(e) =>
                  setEditTemplate({ ...editTemplate, description: e.target.value })
                }
                className="w-full p-2 mb-2 border rounded"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800"
              >
                Save Changes
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
