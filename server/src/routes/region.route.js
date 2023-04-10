const State = require("../models/state.schema");
const City = require("../models/city.model");
const express = require("express");

const router = express.Router();

router.get("/states", async (req, res) => {
  const states = await State.find();
  res.send(states);
});

router.get("/cities/:stateCode", async (req, res) => {
  const { stateCode } = req.params;
  const cities = await City.find({ stateCode });
  res.send(cities);
});

module.exports = router;
