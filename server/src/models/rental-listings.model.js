const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  address1: String,
  houseNo: String,
});

addressSchema.virtual("stateName", {
  ref: "states",
  localField: "state",
  foreignField: "isoCode",
  justOne: true,
});

const rentalListingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  propertyType: {
    type: String,
    enum: ["Apartment", "House", "AirBnb", "Building"],
    required: true,
  },

  address: { type: addressSchema, required: true },

  amenities: {
    furnished: { type: Boolean, default: false },
    parkingSpace: { type: Boolean, default: false },
    electricityAvailable: { type: Boolean, default: false },
    waterAvailable: { type: Boolean, default: false },
    heating: { type: String, required: true },
    cooling: { type: String, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
  },

  contact: {
    name: String,
    email: String,
    phone: String,
  },

  price: { type: Number, required: true },
  priceType: {
    type: String,
    enum: ["Per Day", "Per Month"],
    default: "Per Month",
  },

  imageUrls: [
    {
      imagePath: { type: String, required: true },
      isDefault: { type: Boolean, default: false },
    },
  ],
  availableDate: { type: Date, required: true },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "profile",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  blocked: { type: Boolean, default: false },
});

module.exports = mongoose.model("rentalListing", rentalListingSchema);
