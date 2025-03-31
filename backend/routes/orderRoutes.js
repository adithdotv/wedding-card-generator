const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

router.post("/place-order", async (req, res) => {
  try {
    const { user, cartItems, totalPrice, address } = req.body;


    if (!user || !cartItems || !totalPrice || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new order instance
    const newOrder = new Order({
      user,
      cartItems,
      totalPrice,   
      address,
      orderStatus: "Pending", // Default status
    });

    await newOrder.save();

    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.log(error)
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Error placing order", error });
  }
});

// 🔹 Get orders for a specific user (by email)
router.get("/:email", async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.email }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Error fetching orders", details: error.message });
  }
});

module.exports = router;
