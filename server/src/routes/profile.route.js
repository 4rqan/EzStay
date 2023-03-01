const express = require("express");
const requireAuth = require("../middlewares/requireAuth");
const route = express.Router();
const Profile = require("../models/profile.model");

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
module.exports = route;
