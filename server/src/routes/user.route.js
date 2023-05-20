const express = require("express");
const router = express.Router();
const PropertyBooking = require("../models/property-booking.model");
const Property = require("../models/rental-listings.model");
const requireAuth = require("../middlewares/requireAuth");
const { sendMail, asyncHandler } = require("../utils/utils");
const { generateBookingId } = require("../models/last-bookings-ids.model");

router.post(
  "/property/bookings",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { propertyId, checkIn, checkOut, totalGuests, comment, stayPeriod } =
      req.body;

    if (!propertyId) return res.status(400).send("propertyId is required");

    const property = await Property.findOne({ _id: propertyId }).populate({
      path: "owner",
      select: ["fullname", "email"],
    });

    if (req.user.profileId == property.owner._id)
      return res
        .status(400)
        .send(`You cannot book your own ${property.propertyType}`);

    if (!checkIn) return res.status(400).send("checkIn is required");
    const newCheckInDate = getOnlyDate(new Date(checkIn));
    if (newCheckInDate < getOnlyDate(new Date())) {
      return res.status(400).send("checkIn date cannot be in the past");
    }
    if (!checkOut && property.propertyType == "AirBnb")
      return res.status(400).send("checkOut is required");

    let totalPrice = 0;
    let newCheckOutDate;
    if (property.propertyType != "AirBnb") {
      newCheckOutDate = new Date(newCheckInDate).setMonth(
        newCheckInDate.getMonth() + stayPeriod
      );
      totalPrice = parseInt(stayPeriod) * property.price;
    } else {
      newCheckOutDate = getOnlyDate(new Date(checkOut));
      const diffInMs = Math.abs(
        newCheckOutDate.getTime() - newCheckInDate.getTime()
      );
      const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
      totalPrice = diffInDays * property.price;
    }

    const count = await PropertyBooking.countDocuments({
      property: propertyId,
      $and: [
        {
          $or: [{ status: "confirmed" }, { status: "completed" }],
        },
        {
          $or: [
            {
              $and: [
                { checkIn: { $lte: newCheckInDate } },
                { checkOut: { $gt: newCheckInDate } },
              ],
            },
            {
              $and: [
                { checkIn: { $lt: newCheckOutDate } },
                { checkOut: { $gte: newCheckOutDate } },
              ],
            },
            {
              $and: [
                { checkIn: { $gte: newCheckInDate } },
                { checkOut: { $lte: newCheckOutDate } },
              ],
            },
          ],
        },
      ],
    });

    if (count > 0)
      return res.status(400).send("Property already booked in this period");

    const booking = new PropertyBooking({
      bookedBy: req.user.profileId,
      property: propertyId,
      checkIn: newCheckInDate,
      checkOut: newCheckOutDate,
      totalGuests,
      totalPrice,
    });

    booking.bookingId = await generateBookingId("property");

    if (comment) booking.comments = [{ comment, userId: req.user.profileId }];

    await booking.save();

    const replacements = {
      "[MESSAGE1]": `Hi ${property.owner.fullname}`,
      "[MESSAGE2]": `${req.user.fullname} has booked the property ${
        property.title
      } from ${newCheckInDate.toDateString()} to ${newCheckInDate.toDateString()}`,
      "[MESSAGE3]": "Kindly visit EzStay and process the booking.",
      "[MESSAGE4]": "Thanks and regards",
    };
    sendMail(
      [property.owner.email, req.user.email],
      "Booking Placed",
      "general-template.html",
      replacements
    );

    return res.send(booking);
  })
);

router.get(
  "/property/bookingsForLandlord",
  requireAuth,
  asyncHandler(async (req, res) => {
    if (req.user.role !== "Landlord")
      return res
        .status(401)
        .send("You don't have permission to access this feature");
    const bookings = await PropertyBooking.find()
      .populate({
        path: "property",
      })
      .populate({
        path: "bookedBy",
        select: ["fullname", "email"],
      })
      .exec();
    const list = bookings.filter((x) => x.property.owner == req.user.profileId);
    return res.json(list);
  })
);

router.get(
  "/property/bookingsForUser",
  requireAuth,
  asyncHandler(async (req, res) => {
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
  })
);

router.get(
  "/property/bookings/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
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
  })
);

router.post(
  "/property/addComment",
  requireAuth,
  asyncHandler(async (req, res) => {
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
  })
);

router.post(
  "/property/cancelRequest",
  requireAuth,
  asyncHandler(async (req, res) => {
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
  })
);

router.post(
  "/property/processRequest",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { id, price, status, comment } = req.body;
    const booking = await PropertyBooking.findById(id);
    booking.status = status;
    booking.price = price;
    if (comment) {
      const newComment = {
        userId: req.user.profileId,
        comment,
      };
      booking.comments.push(newComment);
    }
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
  })
);

function getOnlyDate(date) {
  return new Date(date.toDateString());
}

module.exports = router;
