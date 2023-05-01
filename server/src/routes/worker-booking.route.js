const express = require("express");
const route = express.Router();
const WorkerBooking = require("../models/worker-booking.model");
const requireAuth = require("../middlewares/requireAuth");

route.post("/bookworker", requireAuth, async (req, res) => {
  const { worker, noOfDays, startDate, workType, comment, location } = req.body;

  if (!worker || !noOfDays || !startDate || !workType || !location) {
    return res.status(400).send("Missing required fields");
  }

  if (isNaN(Date.parse(startDate))) {
    return res.status(400).json("Invalid start date");
  }
  const isWorkerAvailable = await checkWorkerAvailability(worker, startDate);
  if (!isWorkerAvailable) {
    return res.status(400).send("Worker not available on this date");
  }

  const workerBooking = new WorkerBooking({
    worker,
    noOfDays,
    startDate,
    workType,
    location,
  });
  workerBooking.bookedBy = req.user.profileId;

  if (comment) {
    workerBooking.comments = [{ comment, userId: req.user.profileId }];
  }

  await workerBooking.save();

  //sendBookingNotificationEmail(workerBooking);
  res.send(workerBooking);
});

async function checkWorkerAvailability(workerId, startDate) {
  const existingBookings = await WorkerBooking.find({
    worker: workerId,
    startDate: {
      $gte: new Date(startDate),
      $lt: new Date(startDate).setDate(new Date(startDate).getDate() + 1),
    },
  });
  return existingBookings.length === 0;
}

route.get("/workerbookings", requireAuth, async (req, res) => {
  WorkerBooking.find()
    .populate({
      path: "worker",
      populate: {
        path: "profileId",
        select: ["fullname"],
      },
    })
    .populate({
      path: "bookedBy",
      select: ["email", "fullname"],
    })
    .exec(function (err, bookings) {
      if (err) {
        return;
      }
      const list = bookings.filter(
        (x) => x.worker.profileId._id == req.user.profileId
      );
      return res.json(list);
    });
});

route.get("/servicebookings", requireAuth, async (req, res) => {
  const bookings = await WorkerBooking.find({
    bookedBy: req.user.profileId,
  }).populate({
    path: "worker",
    populate: {
      path: "profileId",
      select: ["fullname"],
    },
  });
  res.send(bookings);
});

route.get("/workerbookings/:id", requireAuth, async (req, res) => {
  res.send(await getBookingById(req.params.id));
});

route.post("/workerbooking/addComment", requireAuth, async (req, res) => {
  const { id, comment } = req.body;

  const newComment = {
    userId: req.user.profileId,
    comment,
  };

  const booking = await WorkerBooking.findById(id);
  booking.comments.push(newComment);
  await booking.save();
  res.send(await getBookingById(id));
});

route.post("/workerbooking/cancel", requireAuth, async (req, res) => {
  const { id } = req.body;
  const booking = await WorkerBooking.findById(id);
  booking.status = "cancelled";
  await booking.save();

  res.send(await getBookingById(id));
});

route.post("/workerbooking/process", requireAuth, async (req, res) => {
  const { id, price, status, comment } = req.body;
  const booking = await WorkerBooking.findById(id);
  if (booking.status != "pending" && booking.status != "confirmed")
    return res.status(400).send("Status cannot be updated");

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

  res.send(await getBookingById(id));
});

route.post("/workerbooking/complete", requireAuth, async (req, res) => {
  //To Do : Do neccessary Validation

  const { bookingId } = req.body;
  const workerBooking = await WorkerBooking.findById(bookingId);
  workerBooking.status = "completed";
  workerBooking.paymentStatus = "pay later";
  await workerBooking.save();
  res.send(workerBooking);
});

const getBookingById = async (id) => {
  const booking = await WorkerBooking.findById(id)
    .populate({
      path: "bookedBy",
      select: ["email", "fullname", "address", "contactNo"],
    })
    .populate({
      path: "worker",
      populate: { path: "profileId", select: ["fullname"] },
    })
    .populate({ path: "comments.userId", select: ["dpPath", "fullname"] });
  return booking;
};

module.exports = route;
