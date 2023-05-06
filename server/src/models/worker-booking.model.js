const mongoose = require("mongoose");
const { Schema } = mongoose;

const attendanceSchema = new Schema({
  date: { type: Date, required: true },
  modifiedDate: { type: Date, default: Date.now() },
  workingHours: { type: Number, required: true },
  approvalStatus: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  userComment: String,
});

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

const workerBookingSchema = new Schema(
  {
    worker: {
      type: Schema.Types.ObjectId,
      ref: "worker",
      required: true,
    },
    bookedBy: {
      type: Schema.Types.ObjectId,
      ref: "profile",
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    noOfDays: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    workType: {
      type: String,
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
    attendance: [attendanceSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("WorkerBooking", workerBookingSchema);
