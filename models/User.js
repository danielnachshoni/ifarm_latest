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

  image: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
  cart:[{
    prodactId:{
      type:String,
      require:true
    },
    amount:{
      type:String,
      require:true
    }
  }],
})


module.exports = mongoose.model("User", UserSchema)
