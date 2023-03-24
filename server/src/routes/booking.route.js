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

router.get("/bookingsForLandlord", requireAuth, async (req, res) => {
  if (req.user.role != "Landlord")
    return res
      .status(401)
      .send("You don't have permission to access this feature");
  Booking.find()
    .populate({
      path: "property",
    })
    .populate({
      path: "bookedBy",
      select: ["username", "email"],
    })
    .exec(function (err, bookings) {
      if (err) {
        console.error(err);
        return;
      }
      const list = bookings.filter((x) => x.property.owner == req.user.userId);
      return res.json(list);
    });
});

router.get("/bookings/:id", requireAuth, async (req, res) => {
  const booking = await Booking.findById(req.params.id)
    .populate({
      path: "bookedBy",
      select: ["email"],
    })
    .populate({
      path: "property",
    });

  res.send(booking);
});

module.exports = router;
