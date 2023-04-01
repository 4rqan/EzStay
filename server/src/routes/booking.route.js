const express = require("express");
const router = express.Router();
const Booking = require("../models/booking.model");
const Property = require("../models/rental-listings.model");
const requireAuth = require("../middlewares/requireAuth");
const { sendMail } = require("../utils/utils");

router.post("/bookings", requireAuth, async (req, res) => {
  const { propertyId, checkIn, checkOut, totalGuests, comment } = req.body;

  if (!propertyId) return res.status(400).send("propertyId is required");
  if (!checkIn) return res.status(400).send("checkIn is required");
  if (!checkOut) return res.status(400).send("checkOut is required");

  // const count = await Booking.countDocuments({
  //   property: propertyId,
  //   bookedBy: req.user.profileId,
  // });
  // if (count > 0) return res.status(400).send("Already booked");

  const booking = new Booking({
    bookedBy: req.user.profileId,
    property: propertyId,
    checkIn,
    checkOut,
    totalGuests,
  });

  if (comment) booking.comments = [{ comment, userId: req.user.profileId }];

  await booking.save();

  const property = await Property.findOne({ _id: propertyId }).populate({
    path: "owner",
    select: ["fullname", "email"],
  });
  const replacements = {
    "##LANDLORD##": property.owner.fullname,
    "##USER##": req.user.fullname,
    "##TITLE##": property.title,
  };
  sendMail(
    [property.owner.email, req.user.email],
    "Booking Placed",
    "booking-placed.html",
    replacements
  );

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
      select: ["fullname", "email"],
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
      select: ["fullname"],
    },
  });

  console.log(bookings);
  res.send(bookings);
});

router.get("/bookings/:id", requireAuth, async (req, res) => {
  const booking = await Booking.findById(req.params.id)
    .populate({
      path: "bookedBy",
      select: ["email", "fullname"],
    })
    .populate({
      path: "property",
    })
    .populate({ path: "comments.userId", select: ["dpPath", "fullname"] });

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
  const newBooking = await Booking.findById(id)
    .populate({
      path: "bookedBy",
      select: ["email", "fullname"],
    })
    .populate({
      path: "property",
    })
    .populate({ path: "comments.userId", select: ["dpPath", "fullname"] });

  res.send(newBooking);
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
  const newBooking = await Booking.findById(id)
    .populate({
      path: "bookedBy",
      select: ["email", "fullname"],
    })
    .populate({
      path: "property",
    })
    .populate({ path: "comments.userId", select: ["dpPath", "fullname"] });

  res.send(newBooking);
});

module.exports = router;
