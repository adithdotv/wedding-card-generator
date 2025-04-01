import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Payment = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [isProcessing, setIsProcessing] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [imageURL, setImageURL] = useState("");
  const [orderDetails, setOrderDetails] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/orders/${orderId}`);
        const order = response.data;
        setOrderDetails(order);
        
        if (order.cartItems.length > 0) {
          setImageURL(`http://localhost:5000${order.cartItems[0].image}`);
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const startPayment = () => {
    setShowConfirm(false);
    setIsProcessing(true);
  };

  useEffect(() => {
    let timer;
    if (isProcessing && countdown > 0) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    } else if (isProcessing && countdown === 0) {
      downloadImage();
      navigate("/myorder", { state: { successMessage: "Order placed successfully!" } });
    }
    return () => clearInterval(timer);
  }, [isProcessing, countdown, navigate]);

  const downloadImage = () => {
    if (!imageURL) return;

    axios.get(imageURL, { responseType: "blob" })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "wedding_card.jpg");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => console.error("Error downloading image:", error));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-md shadow-lg text-center max-w-md w-full">
        <h2 className="text-3xl font-bold mb-4">Payment Page</h2>
        
        {orderDetails && (
          <div className="mb-4">
            <img src={imageURL} alt="Wedding Card" className="w-32 h-32 mx-auto rounded-md shadow" />
            <p className="mt-2 text-lg font-semibold">Order ID: {orderDetails._id}</p>
          </div>
        )}

        {isProcessing ? (
          <>
            <p className="text-green-600 text-xl font-semibold mb-2">
              Payment Completed. Downloading Image... ({countdown}s)
            </p>
            <div className="w-full bg-gray-300 rounded-full h-3">
              <div
                className="bg-green-500 h-3 rounded-full"
                style={{ width: `${(5 - countdown) * 20}%` }}
              ></div>
            </div>
          </>
        ) : showConfirm ? (
          <>
            <p className="mb-4 text-gray-700">Are you sure you want to proceed with payment?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={startPayment}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-800 transition"
              >
                Confirm & Pay
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="mb-4">Click the button below to complete your payment.</p>
            <button
              onClick={() => setShowConfirm(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-800 transition flex items-center gap-2"
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
