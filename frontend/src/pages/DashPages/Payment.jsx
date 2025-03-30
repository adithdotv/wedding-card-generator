import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [countdown, setCountdown] = useState(5);

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
      navigate("/home");
    }
    return () => clearInterval(timer);
  }, [isProcessing, countdown, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-md shadow-lg text-center">
        <h2 className="text-3xl font-bold mb-4">Payment Page</h2>
        {isProcessing ? (
          <p className="text-green-600 text-xl font-semibold">
            Payment Completed. Redirecting Now... ({countdown}s)
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
