import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Payment = () => {
  const navigate = useNavigate();
  const { orderId } = useParams(); // Get order ID from URL
  const [isProcessing, setIsProcessing] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [imageURL, setImageURL] = useState(""); // Store image URL

  useEffect(() => {
    const fetchOrderDetails = async () => {
      console.log(orderId)
      try {
        const response = await axios.get(`http://localhost:5000/api/orders/${orderId}`);
        const order = response.data;
        console.log(response.data)

        // Get the first image from cart items
        if (order.cartItems.length > 0) {
          setImageURL(`http://localhost:5000${order.cartItems[0].image}`);
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const handlePayment = () => {
    setIsProcessing(true);
  };

  useEffect(() => {
    let timer;
    if (isProcessing && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (isProcessing && countdown === 0) {
      downloadImage(); // Call the image download function
      navigate("/myorder", { state: { successMessage: "Order placed successfully!" } });
    }
    return () => clearInterval(timer);
  }, [isProcessing, countdown, navigate]);

  // ✅ Function to Download Image
  const downloadImage = () => {
    if (!imageURL) return;

    axios.get(imageURL, { responseType: "blob" }) // Fetch image as blob
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "wedding_card.jpg"); // Set the filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => console.error("Error downloading image:", error));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-md shadow-lg text-center">
        <h2 className="text-3xl font-bold mb-4">Payment Page</h2>
        {isProcessing ? (
          <p className="text-green-600 text-xl font-semibold">
            Payment Completed. Downloading Image... ({countdown}s)
          </p>
        ) : (
          <>
            <p className="mb-4">Click the button below to complete your payment.</p>
            <button
              onClick={handlePayment}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-800 transition"
            >
              Pay Now
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Payment;
