const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  image: { type: String, required: true }, // Base64 image
  name: { type: String, required: true },
  price: { type: Number, required: true },
  email: { type: String, required: true},
  quantity: {type: Number, required: true},
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Cart", CartSchema);
