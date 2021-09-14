const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
  },

  displayName: {
    type: String,
    required: true,
  },

  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  image: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  Cart: {
    type: [
      {
        prod_id: { type: String },
        prod_name: { type: String },
        price: { type: Number },
        qnty: { type: Number },
      },
    ],
  },
})

module.exports = mongoose.model("User", UserSchema)
