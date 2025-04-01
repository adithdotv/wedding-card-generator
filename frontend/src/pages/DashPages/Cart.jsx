import React, { useEffect, useState } from "react";
import Navbar from "../DashPages/Navbar";
import Footer from "../DashPages/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [showAddressPopup, setShowAddressPopup] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");

  // ✅ Get User Data
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ Fetch Cart Items When User is Available
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/api/cart/${user.email}`)
        .then((res) => setCartItems(res.data))
        .catch((err) => console.error("Error fetching cart:", err));
    }
  }, [user]); // Run when user changes

  // ✅ Remove Item From Cart
  const removeFromCart = (id) => {
    axios
      .delete(`http://localhost:5000/api/cart/${id}`)
      .then(() => setCartItems(cartItems.filter((item) => item._id !== id)))
      .catch((err) => console.error("Error removing item:", err));
  };

  // ✅ Corrected Total Price Calculation
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price ,
    0
  );

  // ✅ Handle Place Order
  const handlePlaceOrder = () => {
    setShowAddressPopup(true);
  };

  // ✅ Handle Submitting Order
  const handleAddressSubmit = async () => {
    if (!fullName || !phoneNumber || !email || !street || !address || !pincode) {
      alert("Please fill all address fields!");
      return;
    }
  
    const orderData = {
      user: user.email,
      cartItems: cartItems,
      totalPrice: totalPrice,
      address: {
        fullName,
        phoneNumber,
        email,
        street,
        addressLine: address,
        pincode,
      },
    };
  
    try {
      const response = await axios.post("http://localhost:5000/api/orders/place-order", orderData);

      console.log(response.data)
      
      const orderId = response.data.order._id; // Get the order ID from the response
      console.log("Order placed with ID:", orderId);
      
      setCartItems([]); // Clear the cart
      setShowAddressPopup(false);
      
      // ✅ Navigate to the Payment Page with orderId as a URL parameter
      navigate(`/payment/${orderId}`); 
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };
  

  return (
    <div>
      <Navbar />
      <section
        className="min-h-screen bg-cover bg-center p-6"
        style={{ backgroundImage: "url('/src/assets/bg_login.jpg')" }}
      >
        <div className="max-w-5xl mx-auto bg-white-800 bg-opacity-70 p-6 rounded-md shadow-lg">
          <h2 className="text-4xl font-bold text-white mb-6 text-center">
            Your Cart
          </h2>

          {cartItems.length === 0 ? (
            <p className="text-center text-gray-300">Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center p-4 bg-gray-200 rounded-md shadow-lg"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={`http://localhost:5000${item.image}`}
                      alt={item.name}
                      className="w-20 h-20 rounded-md object-cover"
                    />
                    <div>
                      <h3 className="text-2xl font-medium">{item.name}</h3>
                      <p className="text-gray-700">Price: Rs : {item.price}</p>
                      <p className="text-gray-700">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-700 text-3xl font-bold hover:bg-red-100 p-2 rounded-full transition"
                    title="Remove from Cart"
                  >
                    &times;
                  </button>
                </div>
              ))}

              <div className="text-right mt-4">
                <p className="text-xl font-semibold text-white">
                  Total Price: ${totalPrice.toFixed(2)}
                </p>
                <button
                  onClick={handlePlaceOrder}
                  className="mt-2 px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-900 transition"
                >
                  Place Order
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ✅ Address Popup */}
        {showAddressPopup && (
          <div className="fixed inset-0 flex items-center justify-center"
          style={{ backgroundImage: "url('/src/assets/bg_login.jpg')" }}>
            <div className="bg-white p-6 rounded-md shadow-lg space-y-4 w-96">
              <h3 className="text-2xl font-semibold">Enter Your Details</h3>
              <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full Name" className="w-full p-2 border rounded-md" />
              <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Phone Number" className="w-full p-2 border rounded-md" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email ID" className="w-full p-2 border rounded-md" />
              <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} placeholder="Street" className="w-full p-2 border rounded-md" />
              <textarea value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" className="w-full p-2 border rounded-md" />
              <input type="text" value={pincode} onChange={(e) => setPincode(e.target.value)} placeholder="Pincode" className="w-full p-2 border rounded-md" />
              <button
                onClick={handleAddressSubmit}
                className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-800 transition"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default Cart;
