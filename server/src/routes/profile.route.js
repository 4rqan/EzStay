const express = require("express");
const requireAuth = require("../middlewares/requireAuth");
const route = express.Router();
const Profile = require("../models/profile.model");

const multer = require("multer");
const path = require("path");

const fs = require("fs");
const { promisify } = require("util");

const unlinkAsync = promisify(fs.unlink);

route.post("/profile", requireAuth, async (req, res) => {
  const { fullname, dob, contactNo, gender, address } = req.body;

  const profile =
    (await Profile.findOne({ user: req.user.userId })) || new Profile();
  profile.user = req.user.userId;
  profile.fullname = fullname;
  profile.dob = dob;
  profile.contactNo = contactNo;
  profile.gender = gender;
  profile.address = address;

  await profile.save();
  res.send(profile);
});

route.get("/profile", requireAuth, async (req, res) => {
  const profile = await Profile.findOne({ user: req.user.userId }).populate({
    path: "user",
    select: ["email", "username"],
  });
  res.send(profile);
});

const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
}).single("file");

route.post("/uploadDp", requireAuth, async (req, res) => {
  upload(req, res, async (err) => {
    if (!err) {
      let profile = await Profile.findOne({ user: req.user.userId });
      const existingPath = profile.dpPath;
      profile.dpPath = req.file.filename;
      await profile.save();
      if (existingPath) unlinkAsync("./public/uploads/" + existingPath);
      return res.status(200).send(req.file.filename).end();
    }
    return res.status(400).send("file size should be lesser than 1 MB");
  });
});

module.exports = route;
