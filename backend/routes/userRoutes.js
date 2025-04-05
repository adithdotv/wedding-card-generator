const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require('dotenv')
const nodemailer = require("nodemailer")

dotenv.config()

const router = express.Router();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@example.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin@123";

const transporter = nodemailer.createTransport({
  service: "gmail", // You can use other services like Outlook, or custom SMTP
  auth: {
    user: process.env.EMAIL, // Replace with your email
    pass: process.env.EMAIL_PASSWORD, // Replace with your email password or app password
  },
});

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

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = jwt.sign({ id: user._id }, "secretkey", { expiresIn: "15m" });

    const resetLink = `http://localhost:5173/reset-password?token=${resetToken}`; // Your frontend route

    const mailOptions = {
      from: "your_email@gmail.com",
      to: email,
      subject: "Password Reset Request",
      html: `
        <p>Hi ${user.fullName},</p>
        <p>You requested to reset your password. Click the link below to reset:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p><small>This link will expire in 15 minutes.</small></p>
      `,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Error sending email:", err);
        return res.status(500).json({ error: "Failed to send email!" });
      } else {
        console.log("Email sent:", info.response);
        return res.json({
          message: "Password reset email sent successfully, Check your mail!",
        });
      }
    });
  } catch (error) {
    console.error("Error sending reset email:", error);
    res.status(500).json({ message: "Error sending reset email", error });
  }
});

router.post("/reset-password", async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, "secretkey");
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password reset successfully!" });
  } catch (error) {
    res.status(400).json({ message: "Invalid or expired token", error });
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
        const token = jwt.sign({ email },"secretkey", { expiresIn: "1h" });

        res.json({ message: "Login successful", token });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Server error" });
    }
})


module.exports = router;
