const express = require("express");
const Enquiry = require("../models/Enquiry"); // Import the Enquiry model
const router = express.Router();

// API to store an enquiry
router.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Create a new enquiry document
    const newEnquiry = new Enquiry({ name, email, message });

    // Save enquiry to database
    await newEnquiry.save();

    res.status(200).json({ message: "Enquiry sent successfully!" });
  } catch (error) {
    console.error("Error storing enquiry:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API to get all enquiries
router.get("/enquiries", async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ date: -1 }); // Get all enquiries sorted by date
    res.status(200).json(enquiries);
  } catch (error) {
    console.error("Error fetching enquiries:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
