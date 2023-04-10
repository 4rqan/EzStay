const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  name: String,
  stateCode: String,
  countryCode: String,
  latitude: Number,
  longitude: Number,
});

module.exports = mongoose.model("cities", citySchema);
