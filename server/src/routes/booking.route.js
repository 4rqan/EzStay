const express = require("express");
const router = express.Router();
const Booking = require("../models/booking.model");
const requireAuth = require("../middlewares/requireAuth");

router.post("/bookings", requireAuth, async (req, res) => {
  const { propertyId, checkIn, checkOut, totalGuests, comment } = req.body;

  if (!propertyId) return res.status(400).send("propertyId is required");
  if (!checkIn) return res.status(400).send("checkIn is required");
  if (!checkOut) return res.status(400).send("checkOut is required");

  const booking = new Booking({
    bookedBy: req.user.userId,
    property: propertyId,
    checkIn,
    checkOut,
    totalGuests,
  });

  if (comment) booking.comments = [{ comment, userId: req.user.userId }];

  await booking.save();

  return res.send(booking);
});

module.exports = router;
