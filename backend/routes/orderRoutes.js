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


// Get total order count
router.get("/count", async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    res.status(200).json({ totalOrders });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch order count" });
  }
});

// GET all orders
router.get("/all", async (req, res) => {
  try {
    const orders = await Order.find(); // Fetch all orders from the database
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error, could not fetch orders" });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const { orderStatus } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus },
      { new: true } // Return the updated order
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Order status updated successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});


// 🔹 Get orders for a specific user (by email)
router.get("/user/:email", async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.email }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Error fetching orders", details: error.message });
  }
});

router.get("/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;

    // Find the order by ID
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
