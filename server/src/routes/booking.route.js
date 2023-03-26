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
    bookedBy: req.user.profileId,
    property: propertyId,
    checkIn,
    checkOut,
    totalGuests,
  });

  if (comment) booking.comments = [{ comment, userId: req.user.profileId }];

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
      const list = bookings.filter(
        (x) => x.property.owner == req.user.profileId
      );
      return res.json(list);
    });
});

router.get("/bookingsForUser", requireAuth, async (req, res) => {
  const bookings = await Booking.find({
    bookedBy: req.user.profileId,
  }).populate({
    path: "property",
    populate: {
      path: "owner",
      select: ["username"],
    },
  });

  res.send(bookings);
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

router.post("/addComment", requireAuth, async (req, res) => {
  const { id, comment } = req.body;

  const newComment = {
    userId: req.user.profileId,
    comment,
  };

  const booking = await Booking.findById(id);
  booking.comments.push(newComment);
  await booking.save();
  res.send(booking);
});

router.post("/processRequest", requireAuth, async (req, res) => {
  const { id, price, status, comment } = req.body;
  const booking = await Booking.findById(id);
  if (comment) {
    const newComment = {
      userId: req.user.profileId,
      comment,
    };
    booking.comments.push(newComment);
  }

  booking.totalPrice = price;
  booking.status = status;

  await booking.save();
  res.send(booking);
});

module.exports = router;
