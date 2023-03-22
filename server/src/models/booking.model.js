const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentsSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
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

const bookingSchema = new Schema(
  {
    property: {
      type: Schema.Types.ObjectId,
      ref: "rentalListing",
      required: true,
    },
    bookedBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
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
    totalGuests: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
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
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
    comments: [commentsSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
