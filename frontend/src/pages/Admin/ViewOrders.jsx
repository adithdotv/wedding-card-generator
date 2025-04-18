import React, { useEffect, useState } from "react";
import AdminNavbar from "./Navbar";
import AdminSidebar from "./Sidebar";
import axios from "axios";

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/orders/all");
      setOrders(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/orders/update/${orderId}`, { 
        orderStatus: newStatus 
      });

      if (response.status === 200) {
        // Update the state immediately to reflect the new status
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, orderStatus: newStatus } : order
          )
        );
        alert("Order status updated successfully!");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status.");
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

        {/* Orders List */}
        <div className="p-6 bg-gray-100 flex-1">
          <h3 className="text-xl font-bold mb-4">View Orders</h3>

          {loading ? (
            <p>Loading orders...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {orders.map((order) => (
                <div key={order._id} className="bg-white p-4 rounded shadow-md hover:shadow-lg transition">
                  <h4 className="text-lg font-semibold">Order #{order._id}</h4>
                  
                  <p className={`font-bold ${order.orderStatus === "Delivered" ? "text-green-600" : order.orderStatus === "Processing" ? "text-yellow-600" : "text-red-600"}`}>
                    {order.orderStatus}
                  </p>

                  <label className="block mt-2 text-gray-700 font-semibold">Update Status:</label>
                  <select 
                    value={order.orderStatus} 
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className="border p-2 w-full rounded mt-1"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>

                  <p className="mt-2 text-gray-700">
                    <span className="font-semibold">Full Name:</span> {order.address.fullName}
                  </p>
                  <p className="mt-1 text-gray-700">
                    <span className="font-semibold">Phone:</span> {order.address.phoneNumber}
                  </p>
                  <p className="mt-1 text-gray-700">
                    <span className="font-semibold">Email:</span> {order.address.email}
                  </p>
                  <p className="mt-1 text-gray-700">
                    <span className="font-semibold">Street:</span> {order.address.street}
                  </p>
                  <p className="mt-1 text-gray-700">
                    <span className="font-semibold">Address Line:</span> {order.address.addressLine}
                  </p>
                  <p className="mt-1 text-gray-700">
                    <span className="font-semibold">Pincode:</span> {order.address.pincode}
                  </p>

                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewOrders;
