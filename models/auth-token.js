const { default: mongoose } = require("mongoose");

const appTokens = new mongoose.Schema(
  {
    token: String,
    name: {
      type: String,
      default: "",
    },
    expiry: {
      type: Date,
      default: new Date(),
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("appToken", appTokens);
