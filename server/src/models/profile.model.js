const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  address1: { type: String },
  address2: String,
  city: { type: String },
  state: { type: String },
  country: { type: String },
  pincode: { type: String },
  landmark: String,
});

const profileSchema = new mongoose.Schema({
  user: {
    ref: "user",
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  fullname: { type: String, required: true },
  gender: { type: String, enum: ["Male", "Female"] },
  dob: Date,
  contactNo: { type: String, required: true },
  dpPath: String,
  address: addressSchema,
});

module.exports = mongoose.model("profile", profileSchema);
