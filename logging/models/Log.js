const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  stack: String,
  level: String,
  package: String,
  message: String
});

module.exports = mongoose.model("Log", logSchema);
