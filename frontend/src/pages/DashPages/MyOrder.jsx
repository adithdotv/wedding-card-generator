import React, { useState, useEffect } from "react";
import Navbar from "../DashPages/Navbar";
import Footer from "../DashPages/Footer";
import axios from "axios";

const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) return;

        const user = JSON.parse(storedUser);
        const response = await axios.get(`http://localhost:5000/api/orders/${user.email}`);
        setOrders(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-grow p-8">
        <h2 className="text-4xl font-bold text-center mb-8">My Orders</h2>
        <div className="bg-white p-6 rounded-md shadow-md">
          {loading ? (
            <p className="text-xl text-center">Loading orders...</p>
          ) : orders.length === 0 ? (
            <p className="text-xl text-center">You have no orders yet.</p>
          ) : (
            <ul className="space-y-4">
              {orders.map((order) => (
                <li
                  key={order._id}
                  className="flex justify-between items-center p-4 bg-gray-200 rounded-md shadow-sm"
                >
                  <div>
                    <h3 className="text-xl font-semibold">{order.cartItems[0].name}</h3>
                    <p className="text-gray-700">Price: ${order.cartItems[0].price}</p>
                    <p className="text-gray-700">
                      Order At: {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <p
                    className={`font-bold ${
                      order.orderStatus === "Delivered"
                        ? "text-green-600"
                        : order.status === "Processing"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {order.orderStatus}
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
