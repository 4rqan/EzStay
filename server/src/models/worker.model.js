const mongoose = require("mongoose");

const workerSchema = new mongoose.Schema({
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "profile",
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  imagePath: {
    type: String,
  },
  dailyRate: {
    type: Number,
    required: true,
  },
  availability: {
    type: String,
  },
});

module.exports = mongoose.model("worker", workerSchema);
