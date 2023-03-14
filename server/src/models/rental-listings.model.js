const mongoose = require("mongoose");

const rentalListingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  propertyType: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  imageUrls: [
    {
      imagePath: { type: String, required: true },
      isDefault: { type: Boolean, default: false },
    },
  ],
  availableDate: { type: Date, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("rentalListing", rentalListingSchema);
