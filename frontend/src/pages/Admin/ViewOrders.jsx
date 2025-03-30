import React from "react";
import AdminNavbar from "./Navbar";
import AdminSidebar from "./Sidebar";

const orders = [
  {
    username: "John Doe",
    address: "123 Main St, City, Country",
    templateName: "Elegant Wedding Template",
    quantity: 2,
  },
  {
    username: "Jane Smith",
    address: "456 Elm St, City, Country",
    templateName: "Modern Party Template",
    quantity: 1,
  },
  {
    username: "Alice Johnson",
    address: "789 Oak St, City, Country",
    templateName: "Classic Invitation Template",
    quantity: 3,
  },
];

const ViewOrders = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <AdminNavbar />

        {/* Orders List */}
        <div className="p-6 bg-gray-100 flex-1">
          <h3 className="text-xl font-bold mb-4">View Orders</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {orders.map((order, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded shadow-md hover:shadow-lg transition"
              >
                <h4 className="text-lg font-semibold">Order #{index + 1}</h4>
                <p className="mt-2 text-gray-700">
                  <span className="font-semibold">Username:</span> {order.username}
                </p>
                <p className="mt-1 text-gray-700">
                  <span className="font-semibold">Address:</span> {order.address}
                </p>
                <p className="mt-1 text-gray-700">
                  <span className="font-semibold">Template Name:</span> {order.templateName}
                </p>
                <p className="mt-1 text-gray-700">
                  <span className="font-semibold">Quantity:</span> {order.quantity}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOrders;
