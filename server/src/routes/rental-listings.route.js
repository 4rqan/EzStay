const express = require("express");
const requireAuth = require("../middlewares/requireAuth");
const router = express.Router();
const RentalListing = require("../models/rental-listings.model");

router.post("/rentallistings", requireAuth, async (req, res) => {
  try {
    const rentalListing = new RentalListing({
      title: req.body.title,
      description: req.body.description,
      propertyType: req.body.propertyType,
      location: req.body.location,
      price: req.body.price,
      bedrooms: req.body.bedrooms,
      bathrooms: req.body.bathrooms,
      // imageUrls: req.body.imageUrls,
      availableDate: req.body.availableDate,
    });

    rentalListing.owner = req.user.userId;
    await rentalListing.save();
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
