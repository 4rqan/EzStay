const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { unique: true, type: String },
  email: { unique: true, type: String },
  password: String,
  salt: String,
  role: { type: String },
  status: { type: String },
  approvedLL: Boolean,
  createdOn: Date,
  modifiedBy: String,
  modifiedOn: Date,
  resetLink: String,
});

module.exports = mongoose.model("user", userSchema);
