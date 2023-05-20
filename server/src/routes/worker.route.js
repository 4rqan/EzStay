const express = require("express");
const route = express.Router();
const Worker = require("../models/worker.model");
const requireAuth = require("../middlewares/requireAuth");
const { deleteFileAsync, uploadSingle } = require("../utils/utils");

route.post("/worker", requireAuth, async (req, res) => {
  const { skills, dailyRate, availability } = req.body;

  const worker =
    (await Worker.findOne({ profileId: req.user.profileId })) ||
    new Worker({ profileId: req.user.profileId });
  worker.skills = skills;
  worker.dailyRate = dailyRate;
  worker.availability = availability;

  await worker.save();
  res.send(worker);
});

route.get("/worker", requireAuth, async (req, res) => {
  const worker = await Worker.findOne({ profileId: req.user.profileId });
  res.send(worker);
});

const upload = uploadSingle("file");

route.post("/worker/image", requireAuth, async (req, res) => {
  upload(req, res, async (err) => {
    if (!err) {
      let worker = await Worker.findOne({ profileId: req.user.profileId });
      const existingPath = worker.imagePath;
      worker.imagePath = req.file.filename;
      await worker.save();
      if (existingPath) deleteFileAsync("./public/uploads/" + existingPath);
      return res.status(200).send(req.file.filename).end();
    }
    return res.status(400).send("file size should be lesser than 1 MB");
  });
});

route.get("/services", async (_, res) => {
  const data = await Worker.aggregate([
    { $match: { skills: { $ne: null } } },
    { $unwind: "$skills" },
    {
      $group: {
        _id: "$skills",
        count: { $sum: 1 },
        price: { $avg: "$dailyRate" },
      },
    },
    { $sort: { count: -1 } },
    { $limit: 4 },
    {
      $project: {
        _id: 0,
        service: "$_id",
        count: "$count",
        price: "$price",
      },
    },
  ]);

  res.send(data);
});

route.get("/all/services", async (_, res) => {
  const data = await Worker.aggregate([
    { $match: { skills: { $ne: null } } },
    { $unwind: "$skills" },
    {
      $group: {
        _id: "$skills",
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
    {
      $project: {
        _id: 0,
        service: "$_id",
        count: "$count",
      },
    },
  ]);

  res.send(data);
});

route.get("/services/:skill", async (req, res) => {
  const { skill } = req.params;

  const services = await Worker.find({ skills: skill }).populate({
    path: "profileId",
    select: ["fullname", "email"],
  });
  res.send(services);
});

route.get("/workerdetails/:id", async (req, res) => {
  const { id } = req.params;
  const worker = await Worker.findById(id).populate({
    path: "profileId",
  });

  res.send(worker);
});

module.exports = route;
