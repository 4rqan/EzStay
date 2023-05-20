const express = require("express");
const requireAuth = require("../middlewares/requireAuth");
const Razorpay = require("razorpay");
const route = express.Router();
const PaymentAccount = require("../models/payment-account.model");
const { asyncHandler } = require("../utils/utils");

route.post(
  "/paymentaccount",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { keyId, keySecret } = req.body;

    try {
      const instance = new Razorpay({
        key_id: keyId,
        key_secret: keySecret,
      });

      const options = {
        amount: 100,
        currency: "INR",
        receipt: "Test Order for validation",
      };

      _ = await instance.orders.create(options);

      const payment =
        (await PaymentAccount.findOne({ profile: req.user.profileId })) ||
        new PaymentAccount();

      payment.profile = req.user.profileId;
      payment.keyId = keyId;
      payment.keySecret = keySecret;
      await payment.save();
      res.json(payment);
    } catch (error) {
      res.status(400).send("Invalid Keys");
    }
  })
);

route.get(
  "/paymentAccount",
  requireAuth,
  asyncHandler(async (req, res) => {
    const payment = (await PaymentAccount.findOne({
      profile: req.user.profileId,
    })) || { keyId: "", keySecret: "" };

    res.send(payment);
  })
);

route.get(
  "/getPaymentAccount/:profileId",
  asyncHandler(async (req, res) => {
    const { profileId } = req.params;
    const account = await PaymentAccount.findOne({ profile: profileId });
    return res.send(account);
  })
);

module.exports = route;
