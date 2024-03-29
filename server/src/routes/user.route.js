const express = require("express");
const route = express.Router();
const User = require("../models/user.model");
const Profile = require("../models/profile.model");
const adminRequireAuth = require("../middlewares/adminRequireAuth");
const { asyncHandler } = require("../utils/utils");

route.get(
  "/users/list",
  adminRequireAuth,
  asyncHandler(async (req, res) => {
    const {
      fullname,
      page = 1,
      pageSize = 5,
      sortField = "fullname",
      sortOrder = "asc",
    } = req.query;
    let filter = {};

    if (fullname) {
      filter.fullname = { $regex: fullname, $options: "i" };
    }
    const sortOptions = { [sortField]: sortOrder === "asc" ? 1 : -1 };
    const total = await User.countDocuments(filter);
    const skipDocuments = (page - 1) * pageSize;
    const paginatedUsers = await Profile.find(filter)
      .populate({
        path: "user",
        select: ["email", "username", "status", "role", "approvedLL"],
      })
      .sort(sortOptions)
      .skip(skipDocuments)
      .limit(pageSize);

    res.json({ users: paginatedUsers, total });
  })
);

route.get(
  "/users/details/:id",
  adminRequireAuth,
  asyncHandler(async (req, res) => {
    const users = await Profile.findOne({ user: req.params.id }).populate({
      path: "user",
      select: ["email", "username", "status", "role", "approvedLL"],
    });

    res.send(users);
  })
);

route.put(
  "/users/status",
  adminRequireAuth,
  asyncHandler(async (req, res) => {
    const { userId, status } = req.body;
    const user = await User.findById(userId);
    user.status = status;
    user.modifiedBy = req.user.userId;
    user.modifiedOn = new Date();
    await user.save();
    res.send(user);
  })
);

route.put(
  "/users/approvedStatus",
  adminRequireAuth,
  asyncHandler(async (req, res) => {
    const { userId, approvedLL } = req.body;
    const user = await User.findById(userId);
    user.approvedLL = approvedLL;
    user.modifiedBy = req.user.userId;
    user.modifiedOn = new Date();
    await user.save();
    res.send(user);
  })
);

route.get(
  "/usersbycities",
  asyncHandler(async (_, res) => {
    const data = await Profile.aggregate([
      { $match: { "address.city": { $ne: null } } },
      {
        $group: {
          _id: "$address.city",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 10 },
      { $project: { _id: 0, cityName: "$_id", count: "$count" } },
    ]);

    res.send(data);
  })
);

module.exports = route;
