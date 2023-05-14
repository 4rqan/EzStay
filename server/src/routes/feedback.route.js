const express = require("express");
const Feedback = require("../models/feedback.model");
const adminRequireAuth = require("../middlewares/adminRequireAuth");
const route = express.Router();

route.post("/feedback", async (req, res) => {
  try {
    const feedback = new Feedback(({ name, email, phone, message } = req.body));
    await feedback.save();
    res.send(feedback);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

route.get("/feedbacks", adminRequireAuth, async (req, res) => {
  try {
    const {
      sortBy = "createdDate",
      sortOrder = "desc",
      limit = 10,
      pageNo = 1,
    } = req.query;
    const count = await Feedback.countDocuments();
    const feedbacks = await Feedback.find()
      .sort({
        [sortBy]: sortOrder === "asc" ? 1 : -1,
      })
      .skip((pageNo - 1) * limit)
      .limit(limit);
    res.send({ feedbacks, count });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = route;
