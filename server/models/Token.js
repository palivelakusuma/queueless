const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  userId: String,
  tokenNumber: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Token", tokenSchema);
