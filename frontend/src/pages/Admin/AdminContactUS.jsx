import React from "react";
import AdminNavbar from "./Navbar";
import AdminSidebar from "./Sidebar";

const contacts = [
  {
    name: "Michael Brown",
    email: "michael@example.com",
    message: "Need assistance with template customization.",
  },
  {
    name: "Emily Davis",
    email: "emily@example.com",
    message: "Inquiry about bulk order discounts.",
  },
  {
    name: "David Wilson",
    email: "david@example.com",
    message: "Trouble with payment, need help.",
  },
];

const AdminContactUs = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <AdminNavbar />

        {/* Contact Us List */}
        <div className="p-6 bg-gray-100 flex-1">
          <h3 className="text-xl font-bold mb-4">Contact Us</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {contacts.map((contact, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded shadow-md hover:shadow-lg transition"
              >
                <h4 className="text-lg font-semibold">Message #{index + 1}</h4>
                <p className="mt-2 text-gray-700">
                  <span className="font-semibold">Name:</span> {contact.name}
                </p>
                <p className="mt-1 text-gray-700">
                  <span className="font-semibold">Email:</span> {contact.email}
                </p>
                <p className="mt-1 text-gray-700">
                  <span className="font-semibold">Message:</span> {contact.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminContactUs;
