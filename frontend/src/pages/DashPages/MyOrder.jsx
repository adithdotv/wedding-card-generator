// src/pages/MyOrder.jsx
import React, { useState } from "react";
import Navbar from "../DashPages/Navbar";
import Footer from "../DashPages/Footer";

const MyOrder = () => {
  // Sample list of orders (replace this with actual data from the backend)
  const [orders] = useState([
    { id: 1, name: "Wedding Card 1", price: "$20", status: "Delivered" },
    { id: 2, name: "Wedding Card 2", price: "$15", status: "Processing" },
    { id: 3, name: "Wedding Card 3", price: "$25", status: "Cancelled" },
  ]);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-grow p-8">
        <h2 className="text-4xl font-bold text-center mb-8">My Orders</h2>
        <div className="bg-white p-6 rounded-md shadow-md">
          {orders.length === 0 ? (
            <p className="text-xl text-center">You have no orders yet.</p>
          ) : (
            <ul className="space-y-4">
              {orders.map((order) => (
                <li
                  key={order.id}
                  className="flex justify-between items-center p-4 bg-gray-200 rounded-md shadow-sm"
                >
                  <div>
                    <h3 className="text-xl font-semibold">{order.name}</h3>
                    <p className="text-gray-700">Price: {order.price}</p>
                  </div>
                  <p
                    className={`font-bold ${
                      order.status === "Delivered"
                        ? "text-green-600"
                        : order.status === "Processing"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {order.status}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MyOrder;
 