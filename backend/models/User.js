const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true, unique: true },

  otp: String,
  otpExpiresAt: Date,

  isVerified: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  password: { type: String, select: false }, // Password for admin/web login
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);