const mongoose = require("mongoose");

const stateSchema = new mongoose.Schema({
  name: String,
  isoCode: String,
  countryCode: String,
  latitude: Number,
  longitude: Number,
});

module.exports = mongoose.model("states", stateSchema);
