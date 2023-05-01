const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const workerPaymentSchema = new Schema({
  booking: {
    type: Schema.Types.ObjectId,
    ref: "WorkerBooking",
    required: true,
  },

  amountPaid: Number,
  currency: String,
  paidOn: Date,
  createdOn: Date,
  paymentMode: {
    type: String,
    enum: ["online", "offline"],
    default: "online",
  },
  status: {
    type: String,
    enum: ["created", "authorized", "failed", "captured"],
    default: "online",
  },
  razorPayOrderId: String,
  razorPayPaymentId: String,
});

module.exports = mongoose.model("workerPayment", workerPaymentSchema);
