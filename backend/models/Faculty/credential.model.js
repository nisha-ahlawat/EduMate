const mongoose = require("mongoose");

const facultyCredential = new mongoose.Schema({
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
    default: "faculty",
    enum: ["faculty"],
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

module.exports = mongoose.model("Faculty Credential", facultyCredential);
