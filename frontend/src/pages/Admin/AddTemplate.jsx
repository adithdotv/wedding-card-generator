import React, { useState } from "react";
import axios from "axios";
import AdminNavbar from "./Navbar";
import AdminSidebar from "./Sidebar";

const AddTemplate = () => {
  const [templateName, setTemplateName] = useState("");
  const [file, setFile] = useState(null);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [fields, setFields] = useState([
    { x: 100, y: 200, fontSize: 24, color: "#ff0000" }
  ]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a template file.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("templateName", templateName);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("editableFields", JSON.stringify(fields));

    try {
      const res = await axios.post("http://localhost:5000/api/templates/add", formData);
      alert("Template uploaded successfully!");
      console.log(res.data);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload template.");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <AdminNavbar />

        {/* Add Template Form */}
        <div className="p-6 bg-gray-100 flex-1">
          <h3 className="text-xl font-bold mb-4">Add New Template</h3>
          <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow-md">
            <div>
              <label className="block text-gray-700 font-semibold">Name of Template</label>
              <input
                type="text"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                placeholder="Enter template name"
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">Upload Template</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price"
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
                className="w-full p-2 border rounded"
                rows="4"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 transition"
            >
              Add Template
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTemplate;
