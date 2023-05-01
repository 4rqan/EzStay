const mongoose = require("mongoose");
const { Schema } = mongoose;

const paymentAccountSchema = new Schema({
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "profile",
    required: true,
  },
  keyId: { type: String, required: true },
  keySecret: { type: String, required: true },
});

module.exports = mongoose.model("PaymentAccount", paymentAccountSchema);
