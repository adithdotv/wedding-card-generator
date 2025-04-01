const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const multer = require('multer')

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });
  
  // Route to add item to cart with image upload
  router.post("/add", upload.single("image"), async (req, res) => {
    try {
      const { name, price, email, quantity } = req.body;
  
      if (!req.file || !name || !price || !email || !quantity) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const imagePath = `/uploads/${req.file.filename}`; // Image URL
  
      const newCartItem = new Cart({ image: imagePath, name, price, email, quantity });
      await newCartItem.save();
  
      res.status(201).json({ message: "Added to cart successfully!", cartItem: newCartItem });
    } catch (error) {
      res.status(500).json({ message: "Error adding to cart", error });
    }
  });
  

// 📌 Get Cart Items (Retrieve from Database)
router.get("/:email", async (req, res) => {
  try {
    const { email } = req.params;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const cartItems = await Cart.find({ email });
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error });
  }
});


// 📌 Remove Item from Cart
router.delete("/:id", async (req, res) => {
    try {
      await Cart.findByIdAndDelete(req.params.id);
      res.json({ message: "Item removed from cart" });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });
  
module.exports = router;
