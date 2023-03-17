const express = require("express");
const multer = require("multer");
const requireAuth = require("../middlewares/requireAuth");
const router = express.Router();
const RentalListing = require("../models/rental-listings.model");
const path = require("path");
router.post("/rentallistings", requireAuth, async (req, res) => {
  upload(req, res, async (er) => {
    if (!er) {
      const filenames = req.files.map((file) => ({
        imagePath: file.filename,
        default: 0,
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

        rentalListing.owner = req.user.userId;
        await rentalListing.save();
        res.json({ success: true });
      } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
      }
    }
  });
});

const storage = multer.diskStorage({
  destination: "./public/uploads/rentalimages",
  filename: function (req, file, cb) {
    cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
}).array("files");

router.get("/rentallistings", requireAuth, async (req, res) => {
  const rentalListing = await RentalListing.find({ owner: req.user.userId });
  res.json(rentalListing);
});

router.get("/rentallistings/:id", requireAuth, async (req, res) => {
  const rentalListing = await RentalListing.findById(req.params.id);
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
