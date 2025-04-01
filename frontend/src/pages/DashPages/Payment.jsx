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
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otp, setOtp] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

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

  const validateForm = () => {
    const cardNumberValid = /^[0-9]{15,16}$/.test(cardNumber);
    const expiryDateValid = /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate);
    const cvvValid = /^[0-9]{3}$/.test(cvv);
    if (!cardNumberValid) {
      alert("Invalid card number. It should be 15 or 16 digits.");
      return false;
    }
    if (!expiryDateValid) {
      alert("Invalid date format. Use MM/YY.");
      return false;
    }
    if (!cvvValid) {
      alert("Invalid CVV. It should be 3 digits.");
      return false;
    }
    return true;
  };

  const generateOtp = () => {
    const otpCode = Math.floor(1000 + Math.random() * 9000);
    setGeneratedOtp(otpCode);
    alert(`Your OTP is: ${otpCode}`);
  };

  const startPayment = () => {
    if (otp !== generatedOtp.toString()) {
      alert("Incorrect OTP. Please try again.");
      return;
    }
    // Validation now happens only after OTP is generated
    if (!validateForm()) return;
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
        <h2 className="text-3xl font-bold mb-4">Payment</h2>

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
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/67/SBI_card_logo.png" alt="Not found" />
          <p className="text-black-600 text-xl font-semibold mb-2">Enter Card Details</p>
            <input type="text" placeholder="Enter Full Name as in Card" className="mb-2 p-2 border rounded w-full" />
            <input type="text" placeholder="Enter Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} className="mb-2 p-2 border rounded w-full" />
            <input type="text" placeholder="Enter Date (MM/YY)" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} className="mb-2 p-2 border rounded w-full" />
            <input type="password" placeholder="Enter CVV ( 3 digit )" value={cvv} onChange={(e) => setCvv(e.target.value)} className="mb-2 p-2 border rounded w-full" />
            <button onClick={generateOtp} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-800 transition">Generate OTP</button>
            {generatedOtp && (
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="Enter 4 Digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="mb-2 p-2 border rounded w-full"
                />
              </div>
            )}
            <p className="mb-4 text-gray-700">Are you sure you want to proceed with payment?</p>
            <div className="flex justify-center gap-4">
              <button onClick={startPayment} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-800 transition">
                Confirm & Pay
              </button>
              <button onClick={() => setShowConfirm(false)} className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-600 transition">
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="mb-4">Click the button below to complete your payment.</p>
            <button onClick={() => setShowConfirm(true)} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-800 transition flex items-center gap-2">
              Pay Now
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Payment;
