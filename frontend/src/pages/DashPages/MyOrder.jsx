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
        const response = await axios.get(`http://localhost:5000/api/orders/user/${user.email}`);
        setOrders(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [orders]);

  const cancelOrder = async (orderId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?\nNote: Only 80% of the amount will be refunded within 14 days."
    );

    if (!confirmCancel) return;

    try {
      const response = await axios.put(`http://localhost:5000/api/orders/cancel/${orderId}`);
      alert(response.data.message);
      fetchOrders();
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      <Navbar />

      <div className="flex-grow p-8">
        <h2 className="text-4xl font-bold text-center mb-8">My Orders</h2>
        <div className="bg-white p-6 rounded-md shadow-md w-4/5 mx-auto"> {/* Changed max-w-lg to w-4/5 */}
          {loading ? (
            <p className="text-xl text-center">Loading orders...</p>
          ) : orders.length === 0 ? (
            <p className="text-xl text-center">You have no orders yet.</p>
          ) : (
            <ul className="space-y-4">
              {orders.map((order) => (
                <li
                  key={order._id}
                  className="flex justify-between items-center p-8 bg-gray-200 rounded-md shadow-sm"
                >
                  <div>
                    <h3 className="text-xl font-semibold">
                      {order.cartItems.map((item) => item.name).join(", ")}
                    </h3>
                    <p className="text-gray-700 font-bold ">Price: Rs : {order.totalPrice}</p>
                    <p className="text-gray-700 font-bold">
                      Delivery Address: {order.address.fullName}, {order.address.street}, {order.address.addressLine}, {order.address.pincode}
                    </p>

                    <p className="text-gray-700 font-semibold">
                      Order At: {new Date(order.createdAt).toLocaleString()}
                    </p>
                    {order.orderStatus !== "Delivered" && order.orderStatus !== "Cancelled" && (
                      <button
                        onClick={() => cancelOrder(order._id)}
                        className="mt-2 px-4 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
                      >
                        Cancel Order
                      </button>
                    )}
                  </div>
                  <p
                    className={`font-bold ${
                      order.orderStatus === "Delivered"
                        ? "text-green-600"
                        : order.orderStatus === "Processing"
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

      <Footer />
    </div>
  );
};

export default MyOrder;