const express = require("express");
const requireAuth = require("../middlewares/requireAuth");
const route = express.Router();
const Profile = require("../models/profile.model");

route.post("/profile", requireAuth, async (req, res) => {
  const { fullname, dob, contactNo, gender } = req.body;

  const profile =
    (await Profile.findOne({ user: req.user.userId })) || new Profile();
  profile.user = req.user.userId;
  profile.fullname = fullname;
  profile.dob = dob;
  profile.contactNo = contactNo;
  profile.gender = gender;

  await profile.save();
  res.send(profile);
});

module.exports = route;
