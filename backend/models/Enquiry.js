const mongoose = require("mongoose");

const EnquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true }, // User's email
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Enquiry = mongoose.model("Enquiry", EnquirySchema);
module.exports = Enquiry;
