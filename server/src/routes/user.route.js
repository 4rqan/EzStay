const express = require("express");
const route = express.Router();
const User = require("../models/user.model");
const Profile = require("../models/profile.model");
const requireAuth = require("../middlewares/requireAuth");

route.get("/users/list", requireAuth, async (req, res) => {
  const users = await Profile.find().populate({
    path: "user",
    select: ["email", "username"],
  });

  res.send(users);
});

module.exports = route;
