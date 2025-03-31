const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      ref: "User", // Assuming you're using a User model
      required: true,
    },
    cartItems: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        // quantity: { type: Number, required: true },
        image: { type: String, required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
    address: {
      fullName: { type: String, required: true },
      phoneNumber: { type: String, required: true },
      email: { type: String, required: true },
      street: { type: String, required: true },
      addressLine: { type: String, required: true },
      pincode: { type: String, required: true },
    },
    orderStatus: {
      type: String,
      enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
