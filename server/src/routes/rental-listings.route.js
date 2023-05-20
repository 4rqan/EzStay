const express = require("express");
const requireAuth = require("../middlewares/requireAuth");
const router = express.Router();
const RentalListing = require("../models/rental-listings.model");
const {
  uploadMultiple,
  deleteFileAsync,
  uploadSingle,
} = require("../utils/utils");
const Booking = require("../models/property-booking.model");
const adminRequireAuth = require("../middlewares/adminRequireAuth");

const folderName = "rentalImages";
const upload = uploadMultiple("files", folderName);
const uploadOne = uploadSingle("file", folderName);

router.delete("/rentallistings/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  const isBooked = await Booking.countDocuments({ property: id });

  if (isBooked > 0) {
    return res
      .status(400)
      .send("The Property cannot be deleted as its already Booked");
  }
  const property = await RentalListing.findById(id);
  for (let item of property.imageUrls) {
    await deleteFileAsync("./public/uploads/" + item.imagePath);
  }
  await RentalListing.deleteOne({ _id: id });

  res.send("Deleted successfully");
});

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
        const rentalListing = new RentalListing(
          ({
            title,
            description,
            propertyType,
            price,
            availableDate,
            amenities: {
              furnished,
              parkingSpace,
              electricityAvailable,
              waterAvailable,
              heating,
              cooling,
              bedrooms,
              bathrooms,
            },
            address: { city, state, pincode, address1, houseNo },
            contact: { name, email, phone },
          } = req.body)
        );

        rentalListing.priceType =
          rentalListing.propertyType == "AirBnb" ? "Per Day" : "Per Month";
        rentalListing.imageUrls = filenames;

        rentalListing.owner = req.user.profileId;
        await rentalListing.save();
        res.send(rentalListing);
      } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
      }
    }
  });
});

router.put("/rentallistings", requireAuth, async (req, res) => {
  if (req.user.role != "Landlord")
    return res
      .status(401)
      .send("You don't have permission to access this feature");

  try {
    const {
      title,
      description,
      propertyType,
      price,
      availableDate,
      _id,
      amenities: {
        furnished,
        parkingSpace,
        electricityAvailable,
        waterAvailable,
        heating,
        cooling,
        bedrooms,
        bathrooms,
      },
      address: { city, state, pincode, address1, houseNo },
      contact: { name, email, phone },
    } = req.body;

    const property = await RentalListing.findById(_id);
    if (!property || property.owner != req.user.profileId) {
      return res.status(400).send("Invalid property");
    }

    property.title = title;
    property.description = description;
    property.propertyType = propertyType;
    property.price = price;
    property.priceType = propertyType == "AirBnb" ? "Per Day" : "Per Month";

    property.availableDate = availableDate;
    property.amenities = {
      furnished,
      parkingSpace,
      electricityAvailable,
      waterAvailable,
      heating,
      cooling,
      bedrooms,
      bathrooms,
    };
    property.address = { city, state, pincode, address1, houseNo };
    property.contact = { name, email, phone };

    await property.save();
    res.json(property);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

router.delete("/rentallistings/images/:id/:imageId", async (req, res) => {
  try {
    const { id, imageId } = req.params;
    const property = await RentalListing.findById(id);

    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    const imageToDelete = property.imageUrls.find((x) => x._id == imageId);

    await deleteFileAsync("./public/uploads/" + imageToDelete.imagePath);

    property.imageUrls = property.imageUrls.filter((x) => x._id != imageId);
    await property.save();

    res.json(property);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/rentallistings/images", requireAuth, async (req, res) => {
  if (req.user.role != "Landlord")
    return res
      .status(401)
      .send("You don't have permission to access this feature");

  uploadOne(req, res, async (er) => {
    if (!er) {
      const filename = folderName + "/" + req.file.filename;

      try {
        const { id } = req.body;

        const rentalListing = await RentalListing.findById(id);
        if (!rentalListing || rentalListing.owner != req.user.profileId) {
          return res.status(400).send("Invalid property");
        }
        rentalListing.imageUrls.push({ imagePath: filename });

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
  res.send(rentalListing);
});

router.get("/allListings", async (req, res) => {
  const {
    page = 1,
    pageSize = 6,
    sortField = "title",
    sortOrder = "asc",
    stateCode,
    city,
  } = req.query;

  let filter = { blocked: false };

  if (stateCode) {
    filter["address.state"] = stateCode;
    if (city) {
      filter["address.city"] = city;
    }
  }
  const sortOptions = { [sortField]: sortOrder === "asc" ? 1 : -1 };
  const skipDocuments = (page - 1) * pageSize;
  const totalCount = await RentalListing.countDocuments(filter);

  RentalListing.aggregate([
    { $match: filter },
    { $sort: sortOptions },
    { $skip: skipDocuments },
    { $limit: parseInt(pageSize) },
    {
      $lookup: {
        from: "propertyratings",
        localField: "_id",
        foreignField: "property",
        as: "ratings",
      },
    },
    {
      $addFields: {
        averageRating: { $avg: "$ratings.rating" },
        totalRatings: { $size: "$ratings" },
      },
    },
    {
      $project: {
        ratings: 0,
        address: 0,
        amenities: 0,
        contact: 0,
      },
    },
  ]).exec((err, properties) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ RentalListings: properties, totalCount });
    }
  });
});

router.get("/admin/listings", async (req, res) => {
  const { page = 1, pageSize = 6 } = req.query;
  const skipDocuments = (page - 1) * pageSize;
  const totalCount = await RentalListing.countDocuments();

  RentalListing.aggregate([
    { $sort: { title: 1 } },
    { $skip: skipDocuments },
    { $limit: parseInt(pageSize) },
    {
      $lookup: {
        from: "propertyratings",
        localField: "_id",
        foreignField: "property",
        as: "ratings",
      },
    },
    {
      $addFields: {
        averageRating: { $avg: "$ratings.rating" },
        totalRatings: { $size: "$ratings" },
      },
    },
    {
      $project: {
        ratings: 0,
        address: 0,
        amenities: 0,
        contact: 0,
      },
    },
  ]).exec((err, properties) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ RentalListings: properties, totalCount });
    }
  });
});

router.get("/propertiesbycities", async (_, res) => {
  const data = await RentalListing.aggregate([
    { $match: { "address.city": { $ne: null } } },
    {
      $group: {
        _id: "$address.city",
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
    { $limit: 6 },
    { $project: { _id: 0, cityName: "$_id", count: "$count" } },
  ]);

  res.send(data);
});

router.put("/blockUnblockProperty", adminRequireAuth, async (req, res) => {
  const { id, blocked } = req.body;
  const property = await RentalListing.findById(id);
  property.blocked = blocked;
  await property.save();
  res.send(property);
});

module.exports = router;
