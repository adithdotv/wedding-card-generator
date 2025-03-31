const express = require("express");
const multer = require("multer");
const Template = require("../models/Template.js");

const router = express.Router();

// Multer Storage Config
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// 🚀 Add New Template (POST)
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const { templateName, price, description, editableFields } = req.body;
    const newTemplate = new Template({
      templateName: templateName,
      imageUrl: "/uploads/" + req.file.filename,
      editableFields: JSON.parse(editableFields),
      description: description,
      price: price
    });
    await newTemplate.save();
    res.status(201).json(newTemplate);
  } catch (err) {
    res.status(500).json({ error: "Failed to upload template" });
  }
});

// 📥 Get All Templates (GET)
router.get("/", async (req, res) => {
  try {
    const templates = await Template.find();
    res.json(templates);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch templates" });
  }
});

// 📥 Get Single Template by ID (GET)
router.get("/:id", async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);
    if (!template) return res.status(404).json({ error: "Template not found" });
    res.json(template);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch template" });
  }
});

module.exports = router