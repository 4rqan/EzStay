const express = require("express");
const RentalListings = require("../models/rental-listings.model");
const Worker = require("../models/worker.model");
const { asyncHandler } = require("../utils/utils");
const router = express.Router();

router.get(
  "/search",
  asyncHandler(async (req, res) => {
    try {
      const { searchText } = req.query;

      const rentalListings = await RentalListings.find(
        {
          title: { $regex: searchText, $options: "i" },
        },
        { title: 1, description: 1, _id: 1, price: 1, imageUrls: 1 }
      );

      const workers = await Worker.find(
        {
          skills: { $regex: searchText, $options: "i" },
        },
        { skills: 1, dailyRate: 1, imagePath: 1 }
      ).populate({
        path: "profileId",
        select: "fullname",
      });

      const result = {
        rentalListings: rentalListings,
        workers: workers,
      };

      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  })
);

module.exports = router;
