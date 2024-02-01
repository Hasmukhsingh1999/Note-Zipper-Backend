const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, 
  },
  password: {
    type: String,
    required: true,
  },

  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
  },
  phoneNumber: {
    type: String,
  },
  profileImage: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "admin"], 
    default: "user", 
  },
 
},{timestamps:true});

const User = mongoose.model("User", userSchema);

module.exports = User;
