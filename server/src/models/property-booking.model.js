const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentsSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "profile",
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },
  updatedDate: {
    type: Date,
    default: Date.now(),
  },
});

const propertyBookingSchema = new Schema(
  {
    property: {
      type: Schema.Types.ObjectId,
      ref: "rentalListing",
      required: true,
    },
    bookingId: String,
    bookedBy: {
      type: Schema.Types.ObjectId,
      ref: "profile",
      required: true,
    },
    checkIn: {
      type: Date,
      required: true,
    },
    checkOut: {
      type: Date,
      required: true,
    },
    stayPeriod: { type: Number, min: 1, max: 12, default: 1 },
    totalGuests: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "pay later", "paid"],
      default: "pending",
    },
    cancelled: {
      type: Boolean,
      default: false,
    },
    cancellationReason: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled", "rejected"],
      default: "pending",
    },
    comments: [commentsSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("PropertyBooking", propertyBookingSchema);
