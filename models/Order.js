// server/models/Order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  items: [
    {
      productId: String,
      name: String,
      price: Number,
      qty: Number
    }
  ],
  total: Number,
  paymentMethod: String,
  channel: { type: String, default: "POS" }, // POS / ONLINE
  customer: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", orderSchema);
