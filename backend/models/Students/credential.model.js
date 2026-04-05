const mongoose = require("mongoose");

const studentCredential = new mongoose.Schema({
  loginid: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "student",
    enum: ["student"],
  },
  refreshTokenHash: {
    type: String,
    default: null,
  },
  tokenVersion: {
    type: Number,
    default: 0,
  }
}, { timestamps: true });

module.exports = mongoose.model("Student Credential", studentCredential);
