const express = require("express");
const requireAuth = require("../middlewares/requireAuth");
const route = express.Router();
const Profile = require("../models/profile.model");

const { uploadSingle, deleteFileAsync, sendMail } = require("../utils/utils");

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
  // sendMail("wizshahid@gmail.com", "Hello World", "Hello");
  res.send(profile);
});

const upload = uploadSingle("file");

route.post("/uploadDp", requireAuth, async (req, res) => {
  upload(req, res, async (err) => {
    if (!err) {
      let profile = await Profile.findOne({ user: req.user.userId });
      const existingPath = profile.dpPath;
      profile.dpPath = req.file.filename;
      await profile.save();
      if (existingPath) deleteFileAsync("./public/uploads/" + existingPath);
      return res.status(200).send(req.file.filename).end();
    }
    return res.status(400).send("file size should be lesser than 1 MB");
  });
});

route.get("/profile/compact", requireAuth, async (req, res) => {
  try {
    const profile = await Profile.findById(req.user.profileId);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    const { fullname, dpPath } = profile;
    res.json({ fullname, dpPath });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = route;
