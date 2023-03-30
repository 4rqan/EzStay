const express = require("express");
const requireAuth = require("../middlewares/requireAuth");
const router = express.Router();
const RentalListing = require("../models/rental-listings.model");
const { uploadMultiple } = require("../utils/utils");

const folderName = "rentalImages";
const upload = uploadMultiple("files", folderName);

router.post("/rentallistings", requireAuth, async (req, res) => {
  if (req.user.role != "Landlord")
    return res
      .status(401)
      .send("You don't have permission to access this feature");

  upload(req, res, async (er) => {
    if (!er) {
      const filenames = req.files.map((file, i) => ({
        imagePath: folderName + "/" + file.filename,
        default: i == 0 ? 1 : 0,
      }));
      try {
        const rentalListing = new RentalListing({
          title: req.body.title,
          description: req.body.description,
          propertyType: req.body.propertyType,
          location: req.body.location,
          price: req.body.price,
          bedrooms: req.body.bedrooms,
          bathrooms: req.body.bathrooms,
          imageUrls: filenames,
          availableDate: req.body.availableDate,
        });

        rentalListing.owner = req.user.profileId;
        await rentalListing.save();
        res.json(rentalListing);
      } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
      }
    }
  });
});

router.get("/rentallistings", requireAuth, async (req, res) => {
  const rentalListing = await RentalListing.find({ owner: req.user.profileId });
  res.json(rentalListing);
});

router.get("/rentallistings/:id", async (req, res) => {
  const rentalListing = await RentalListing.findById(req.params.id);
  console.log(rentalListing);
  res.send(rentalListing);
});

router.get("/allListings", async (req, res) => {
  const {
    page = 1,
    pageSize = 6,
    sortField = "title",
    sortOrder = "asc",
  } = req.query;

  const sortOptions = { [sortField]: sortOrder === "asc" ? 1 : -1 };
  const skipDocuments = (page - 1) * pageSize;
  const rentalListing = await RentalListing.find()
    .sort(sortOptions)
    .skip(skipDocuments)
    .limit(pageSize);
  res.json({ RentalListings: rentalListing });
});

module.exports = router;
