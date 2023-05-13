const express = require("express");
const route = express.Router();
const WorkerBooking = require("../models/worker-booking.model");
const Worker = require("../models/worker.model");
const requireAuth = require("../middlewares/requireAuth");
const { generateBookingId } = require("../models/last-bookings-ids.model");
const { sendMail } = require("../utils/utils");

route.post("/bookworker", requireAuth, async (req, res) => {
  const { worker, noOfDays, startDate, workType, comment, location } = req.body;

  if (!worker || !noOfDays || !startDate || !workType || !location) {
    return res.status(400).send("Missing required fields");
  }

  const wrk = await Worker.findById(worker).populate({
    path: "profileId",
    select: ["fullname", "email"],
  });

  if (req.user.profileId == wrk.profileId._id)
    return res.status(400).send(`You cannot book yourself`);

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
  workerBooking.bookingId = await generateBookingId("service");

  if (comment) {
    workerBooking.comments = [{ comment, userId: req.user.profileId }];
  }

  await workerBooking.save();

  const replacements = {
    "[MESSAGE1]": `Hi ${wrk.profileId.fullname}`,
    "[MESSAGE2]": `${req.user.fullname} has booked your service from ${new Date(
      startDate
    ).toDateString()} for ${workType}, location(${location}) for ${noOfDays} days`,
    "[MESSAGE3]": "Kindly visit EzStay and process the booking.",
    "[MESSAGE4]": "Thanks and regards",
  };
  sendMail(
    [wrk.profileId.email, req.user.email],
    "Booking Placed",
    "general-template.html",
    replacements
  );
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

route.get("/workerbookings/forworker/:id", requireAuth, async (req, res) => {
  const bookings = await getBookingById(req.params.id);
  if (bookings.worker.profileId._id != req.user.profileId)
    return res.status(400).send("You don't have permsission to access this");
  res.send(bookings);
});

route.get("/workerbookings/foruser/:id", requireAuth, async (req, res) => {
  const bookings = await getBookingById(req.params.id);
  if (bookings.bookedBy._id != req.user.profileId)
    return res.status(400).send("You don't have permsission to access this");
  res.send(bookings);
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

route.post("/workerbooking/attendance", requireAuth, async (req, res) => {
  const { id, workingHours, date } = req.body;

  const newDate = new Date(date);
  if (newDate > Date.now()) {
    return res.status(400).send("Date should not be in Future");
  }
  const attendance = {
    workingHours,
    date: newDate,
  };

  const booking = await WorkerBooking.findById(id);

  if (newDate < booking.startDate) {
    return res.status(400).send("Date should not be less than the start date");
  }

  booking.attendance = booking.attendance || [];

  debugger;
  if (
    booking.attendance.some(
      (x) => x.date.toDateString() == newDate.toDateString()
    )
  ) {
    return res
      .status(400)
      .send("You have already added attendance for the mentioned Date");
  }

  if (
    booking.attendance.filter((x) => x.approvalStatus == "approved").length ==
    booking.noOfDays
  ) {
    return res
      .status(400)
      .send(
        "Sorry, you cannot mark attendance if you have worked for {days -1}} days."
      );
  }

  booking.attendance.push(attendance);
  await booking.save();
  res.send(await getBookingById(id));
});

route.put(
  "/workerbooking/attendance/approve",
  requireAuth,
  async (req, res) => {
    const { bookingId, attendanceId } = req.body;

    const booking = await WorkerBooking.findById(bookingId);

    if (booking.bookedBy != req.user.profileId)
      return res
        .status(400)
        .send("You don't have permission to update the status");

    if (
      booking.attendance.filter((x) => x.approvalStatus == "approved").length ==
      booking.noOfDays
    ) {
      return res
        .status(400)
        .send(
          "Sorry, you cannot mark attendance if yu have worked for {days -1}} days."
        );
    }

    const attendance = booking.attendance.find((x) => x._id == attendanceId);

    //
    attendance.approvalStatus = "approved";
    attendance.modifiedDate = Date.now();
    await booking.save();
    res.send(booking);
  }
);

route.put("/workerbooking/attendance/reject", requireAuth, async (req, res) => {
  const { bookingId, attendanceId, userComment } = req.body;

  const booking = await WorkerBooking.findById(bookingId);

  if (booking.bookedBy != req.user.profileId)
    return res
      .status(400)
      .send("You don't have permission to update the status");

  const attendance = booking.attendance.find((x) => x._id == attendanceId);

  attendance.approvalStatus = "rejected";
  attendance.userComment = userComment;
  attendance.modifiedDate = Date.now();
  await booking.save();
  res.send(booking);
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
