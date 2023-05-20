const State = require("../models/state.schema");
const City = require("../models/city.model");
const express = require("express");
const { asyncHandler } = require("../utils/utils");

const router = express.Router();

router.get(
  "/states",
  asyncHandler(async (req, res) => {
    const states = await State.find();
    res.send(states);
  })
);

router.get(
  "/cities/:stateCode",
  asyncHandler(async (req, res) => {
    const { stateCode } = req.params;
    const cities = await City.find({ stateCode });
    res.send(cities);
  })
);

module.exports = router;
