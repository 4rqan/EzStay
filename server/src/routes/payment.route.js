const express = require("express");
const requireAuth = require("../middlewares/requireAuth");
const Razorpay = require("razorpay");
const route = express.Router();
const WorkerBooking = require("../models/worker-booking.model");
const WorkerPayment = require("../models/worker-payment.model");
const PaymentAccount = require("../models/payment-account.model");

const PropertyBooking = require("../models/property-booking.model");
const PropertyPayment = require("../models/property-payment.model");
const { asyncHandler } = require("../utils/utils");

route.post(
  "/service/payment/createorder",
  requireAuth,
  asyncHandler(async (req, res) => {
    try {
      const { bookingId } = req.body;

      const booking = await WorkerBooking.findById(bookingId).populate(
        "worker"
      );
      if (
        booking.status != "confirmed" &&
        !(booking.status == "completed" && booking.paymentStatus == "pay later")
      ) {
        return res.status(400).send("Payment cannot be created");
      }

      const paymentAccount = await PaymentAccount.findOne({
        profile: booking.worker.profileId,
      });

      if (!paymentAccount) {
        return res.status(400).send("Worker doesn't have a payment account");
      }

      const instance = getRazorPayInstance(
        paymentAccount.keyId,
        paymentAccount.keySecret
      );

      const options = {
        amount: booking.totalPrice * 100,
        currency: "INR",
        receipt: bookingId,
      };

      const order = await instance.orders.create(options);

      if (!order) return res.status(500).send("Some error occurred");

      const workerPayment = new WorkerPayment({
        booking: bookingId,
        paymentMode: "online",
        createdOn: Date.now(),
        razorPayOrderId: order.id,
        status: "created",
      });
      await workerPayment.save();

      res.json(order);
    } catch (error) {
      res.status(500).send(error);
    }
  })
);

route.post(
  "/service/payment/capture",
  requireAuth,
  asyncHandler(async (req, res) => {
    try {
      const { paymentId, bookingId, orderId } = req.body;

      const booking = await WorkerBooking.findById(bookingId).populate(
        "worker"
      );
      if (
        booking.status != "confirmed" &&
        !(booking.status == "completed" && booking.paymentStatus == "pay later")
      ) {
        return res.status(400).send("Payment cannot be captured");
      }

      const paymentAccount = await PaymentAccount.findOne({
        profile: booking.worker.profileId,
      });

      if (!paymentAccount) {
        return res.status(400).send("Worker doesn't have a payment account");
      }

      const instance = getRazorPayInstance(
        paymentAccount.keyId,
        paymentAccount.keySecret
      );
      const order = await instance.orders.fetch(orderId);
      const payment = await instance.payments.capture(
        paymentId,
        order.amount,
        order.currency
      );

      if (!payment) return res.status(500).send("Some error occurred");

      const workerPayment = await WorkerPayment.findOne({
        razorPayOrderId: orderId,
      });

      workerPayment.amountPaid = order.amount / 100;
      workerPayment.currency = order.currency;
      workerPayment.paidOn = Date.now();
      workerPayment.status = "captured";

      await workerPayment.save();

      const workerBooking = await WorkerBooking.findById(bookingId);
      workerBooking.status = "completed";
      workerBooking.paymentStatus = "paid";
      await workerBooking.save();

      res.json(payment);
    } catch (error) {
      res.status(500).send(error);
    }
  })
);

route.post(
  "/property/payment/createorder",
  requireAuth,
  asyncHandler(async (req, res) => {
    try {
      const { bookingId } = req.body;

      const booking = await PropertyBooking.findById(bookingId).populate(
        "property"
      );
      if (
        booking.status != "confirmed" &&
        !(booking.status == "completed" && booking.paymentStatus == "pay later")
      ) {
        return res.status(400).send("Payment cannot be created");
      }

      const paymentAccount = await PaymentAccount.findOne({
        profile: booking.property.owner,
      });

      if (!paymentAccount) {
        return res.status(400).send("Worker doesn't have a payment account");
      }

      const instance = getRazorPayInstance(
        paymentAccount.keyId,
        paymentAccount.keySecret
      );

      const options = {
        amount: booking.totalPrice * 100,
        currency: "INR",
        receipt: bookingId,
      };

      const order = await instance.orders.create(options);

      if (!order) return res.status(500).send("Some error occurred");

      const propertyPayment = new PropertyPayment({
        booking: bookingId,
        paymentMode: "online",
        createdOn: Date.now(),
        razorPayOrderId: order.id,
        status: "created",
      });
      await propertyPayment.save();

      res.json(order);
    } catch (error) {
      res.status(500).send(error);
    }
  })
);

route.post(
  "/property/payment/capture",
  requireAuth,
  asyncHandler(async (req, res) => {
    try {
      const { paymentId, bookingId, orderId } = req.body;

      const booking = await PropertyBooking.findById(bookingId).populate(
        "property"
      );
      if (
        booking.status != "confirmed" &&
        !(booking.status == "completed" && booking.paymentStatus == "pay later")
      ) {
        return res.status(400).send("Payment cannot be captured");
      }

      const paymentAccount = await PaymentAccount.findOne({
        profile: booking.property.owner,
      });

      if (!paymentAccount) {
        return res.status(400).send("Worker doesn't have a payment account");
      }

      const instance = getRazorPayInstance(
        paymentAccount.keyId,
        paymentAccount.keySecret
      );
      const order = await instance.orders.fetch(orderId);
      const payment = await instance.payments.capture(
        paymentId,
        order.amount,
        order.currency
      );

      if (!payment) return res.status(500).send("Some error occurred");

      const propertyPayment = await PropertyPayment.findOne({
        razorPayOrderId: orderId,
      });

      propertyPayment.amountPaid = order.amount / 100;
      propertyPayment.currency = order.currency;
      propertyPayment.paidOn = Date.now();
      propertyPayment.status = "captured";

      await propertyPayment.save();

      const propertyBooking = await PropertyBooking.findById(bookingId);
      propertyBooking.status = "completed";
      propertyBooking.paymentStatus = "paid";
      await propertyBooking.save();

      res.json(payment);
    } catch (error) {
      res.status(500).send(error);
    }
  })
);

const getRazorPayInstance = (key_id, key_secret) => {
  return new Razorpay({
    key_id,
    key_secret,
  });
};

module.exports = route;
