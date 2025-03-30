import React, { useState } from "react";
import Navbar from "../DashPages/Navbar";
import Footer from "../DashPages/Footer";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();

  // Dummy cart items for testing
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Wedding Card 1", price: 20, quantity: 2, image: "/src/assets/wedding_card.jpg" },
    { id: 2, name: "Wedding Card 2", price: 15, quantity: 1, image: "/src/assets/wedding_card.jpg" },
    { id: 3, name: "Wedding Card 3", price: 25, quantity: 3, image: "/src/assets/wedding_card.jpg" },
  ]);

  // State variables for address and form inputs
  const [showAddressPopup, setShowAddressPopup] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");

  // Function to remove item from cart
  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Calculate total price
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Handle placing the order
  const handlePlaceOrder = () => {
    setShowAddressPopup(true);
  };

  // Handle submitting the address
  const handleAddressSubmit = () => {
    if (!fullName || !phoneNumber || !email || !street || !address || !pincode) {
      alert("Please fill in all fields");
      return;
    }
    setShowAddressPopup(false);
    navigate("/payment");
  };

  return (
    <div>
      <Navbar />
      <section
        className="min-h-screen bg-cover bg-center p-6"
        style={{ backgroundImage: "url('/src/assets/bg_login.jpg')" }}
      >
        <div className="max-w-5xl mx-auto bg-white-800 bg-opacity-70 p-6 rounded-md shadow-lg">
          <h2 className="text-4xl font-bold text-white mb-6 text-center">Your Cart</h2>

          {cartItems.length === 0 ? (
            <p className="text-center text-gray-300">Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center p-4 bg-gray-200 rounded-md shadow-lg"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-md object-cover"
                    />
                    <div>
                      <h3 className="text-2xl font-medium">{item.name}</h3>
                      <p className="text-gray-700">Price: ${item.price}</p>
                      <p className="text-gray-700">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-700 text-3xl font-bold hover:bg-red-100 p-2 rounded-full transition"
                    title="Remove from Cart"
                  >
                    &times;
                  </button>
                </div>
              ))}

              <div className="text-right mt-4">
                <p className="text-xl font-semibold text-white">Total Price: ${totalPrice}</p>
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

        {/* Address Popup */}
        {showAddressPopup && (
          <div className="fixed inset-0 flex items-center justify-center "
          style={{ backgroundImage: "url('/src/assets/bg_login.jpg')" }}>
            <div className="bg-white p-6 rounded-md shadow-lg space-y-4 w-96">
              <h3 className="text-2xl font-semibold">Enter Your Details</h3>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
                className="w-full p-2 border rounded-md"
              />
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Phone Number"
                className="w-full p-2 border rounded-md"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email ID"
                className="w-full p-2 border rounded-md"
              />
              <input
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                placeholder="Street"
                className="w-full p-2 border rounded-md"
              />
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
                className="w-full p-2 border rounded-md"
              />
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Pincode"
                className="w-full p-2 border rounded-md"
              />
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
