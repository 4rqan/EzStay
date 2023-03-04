const express = require("express");
const route = express.Router();
const User = require("../models/user.model");
const Profile = require("../models/profile.model");
const adminRequireAuth = require("../middlewares/adminRequireAuth");

route.get("/users/list", adminRequireAuth, async (req, res) => {
  const users = await Profile.find().populate({
    path: "user",
    select: ["email", "username", "status", "role", "approvedLL"],
  });

  res.send(users);
});

route.put("/users/status", adminRequireAuth, async (req, res) => {
  const { userId, status } = req.body;
  const user = await User.findById(userId);
  user.status = status;
  user.modifiedBy = req.user.userId;
  user.modifiedOn = new Date();
  await user.save();
  res.send(user);
});

route.put("/users/approvedStatus", adminRequireAuth, async (req, res) => {
  const { userId, approvedLL } = req.body;
  console.log(approvedLL);
  const user = await User.findById(userId);
  user.approvedLL = approvedLL;
  user.modifiedBy = req.user.userId;
  user.modifiedOn = new Date();
  await user.save();
  res.send(user);
});

module.exports = route;