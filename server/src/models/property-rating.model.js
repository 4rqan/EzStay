const mongoose = require("mongoose");
const { Schema } = mongoose;

const ratingSchema = new Schema({
  property: {
    type: Schema.Types.ObjectId,
    ref: "rentalListing",
    required: true,
  },
  profile: {
    type: Schema.Types.ObjectId,
    ref: "profile",
    required: true,
  },
  rating: { type: Number, min: 1, max: 5 },
  feedback: String,
  createdDate: { type: Date, default: Date.now(), immutable: true },
  modifiedDate: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("PropertyRatings", ratingSchema);
