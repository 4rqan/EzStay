const express = require("express");
const router = express.Router();
const PropertyBooking = require("../models/property-booking.model");
const Property = require("../models/rental-listings.model");
const requireAuth = require("../middlewares/requireAuth");
const { sendMail } = require("../utils/utils");

router.post("/property/bookings", requireAuth, async (req, res) => {
  const { propertyId, checkIn, checkOut, totalGuests, comment } = req.body;

  if (!propertyId) return res.status(400).send("propertyId is required");
  if (!checkIn) return res.status(400).send("checkIn is required");
  if (!checkOut) return res.status(400).send("checkOut is required");

  const count = await PropertyBooking.countDocuments({
    property: propertyId,
    bookedBy: req.user.profileId,
  });
  if (count > 0) return res.status(400).send("Already booked");

  const booking = new PropertyBooking({
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

router.get("/property/bookingsForLandlord", requireAuth, async (req, res) => {
  if (req.user.role != "Landlord")
    return res
      .status(401)
      .send("You don't have permission to access this feature");
  PropertyBooking.find()
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

router.get("/property/bookingsForUser", requireAuth, async (req, res) => {
  const bookings = await PropertyBooking.find({
    bookedBy: req.user.profileId,
  }).populate({
    path: "property",
    populate: {
      path: "owner",
      select: ["fullname"],
    },
  });
  res.send(bookings);
});

router.get("/property/bookings/:id", requireAuth, async (req, res) => {
  const booking = await PropertyBooking.findById(req.params.id)
    .populate({
      path: "bookedBy",
      select: ["email", "fullname", "address", "contactNo"],
    })
    .populate({
      path: "property",
    })
    .populate({ path: "comments.userId", select: ["dpPath", "fullname"] });

  res.send(booking);
});

router.post("/property/addComment", requireAuth, async (req, res) => {
  const { id, comment } = req.body;

  const newComment = {
    userId: req.user.profileId,
    comment,
  };

  const booking = await PropertyBooking.findById(id);
  booking.comments.push(newComment);
  await booking.save();
  const newBooking = await PropertyBooking.findById(id)
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

router.post("/property/cancelRequest", requireAuth, async (req, res) => {
  const { id } = req.body;
  const booking = await PropertyBooking.findById(id);

  booking.status = "cancelled";
  await booking.save();

  const newBooking = await PropertyBooking.findById(id)
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

router.post("/property/processRequest", requireAuth, async (req, res) => {
  const { id, price, status, comment } = req.body;
  const booking = await PropertyBooking.findById(id);
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
  const newBooking = await PropertyBooking.findById(id)
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

router.get("/property/hasbooked/:property", requireAuth, async (req, res) => {
  const { property } = req.params;
  const count = await PropertyBooking.countDocuments({
    property,
    bookedBy: req.user.profileId,
  });

  res.send({ hasBooked: count > 0 });
});

router.post("/propertybooking/complete", requireAuth, async (req, res) => {
  //To Do : Do neccessary Validation

  const { bookingId } = req.body;
  const propertyBooking = await PropertyBooking.findById(bookingId);
  propertyBooking.status = "completed";
  propertyBooking.paymentStatus = "pay later";
  await propertyBooking.save();
  res.send(propertyBooking);
});

module.exports = router;
