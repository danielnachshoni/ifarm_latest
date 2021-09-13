// orders.js = Story.js

const mongoose = require("mongoose")

const OrdersSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },

  body: {
    type: String,
    required: false,
  },

  price: {
    type: String,
    required: true,
    trim: true,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  image: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("Order", OrdersSchema)
