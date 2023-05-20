const express = require("express");
const router = express.Router();
const PropertyRatings = require("../models/property-rating.model");
const requireAuth = require("../middlewares/requireAuth");
const { asyncHandler } = require("../utils/utils");

router.post(
  "/property/addratings",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { property, rating, feedback } = req.body;

    try {
      const propRatings =
        (await PropertyRatings.findOne({
          property,
          profile: req.user.profileId,
        })) || new PropertyRatings({ profile: req.user.profileId, property });

      propRatings.rating = rating;
      propRatings.feedback = feedback;
      propRatings.modifiedDate = Date.now();

      await propRatings.save();
      res.send(propRatings);
    } catch (e) {
      res.status(500).send(e);
    }
  })
);

router.get(
  "/property/getratings/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const propRatings =
      (await PropertyRatings.findOne({
        property: id,
        profile: req.user.profileId,
      })) || new PropertyRatings({ profile: req.user.profileId, property: id });

    res.send(propRatings);
  })
);

router.get("/property/getallreviews/:property", async (req, res) => {
  const { property } = req.params;
  const reviews = await PropertyRatings.find({ property }).populate({
    path: "profile",
    select: ["fullname", "dpPath"],
  });
  res.send(reviews);
});

module.exports = router;
