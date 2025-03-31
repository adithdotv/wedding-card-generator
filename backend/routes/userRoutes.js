const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require('dotenv')

dotenv.config()

const router = express.Router();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@example.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin@123";

// **User Registration**
router.post("/register", async (req, res) => {
  const { fullName, email, phone, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ fullName, email, phone, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
});

// **User Login**
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, "secretkey", { expiresIn: "3d" });

    res.json({ message: "Login successful!", token, user: { fullName: user.fullName, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
});


router.post("/admin-login", async(req, res) => {

    const { email, password } = req.body;
    try {
        // Check if email matches
        if (email !== ADMIN_EMAIL) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Check if password matches
        if (password !== ADMIN_PASSWORD) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Generate JWT token
        const token = jwt.sign({ email },"secret key", { expiresIn: "1h" });

        res.json({ message: "Login successful", token });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Server error" });
    }
})


module.exports = router;
