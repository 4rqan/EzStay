const express = require("express");
const app = express();
require("./config/database").connect();
require("./config/seedAdminUser").seedAdminUser();
const authRoutes = require("./routes/auth.route");
const profileRoutes = require("./routes/profile.route");
const userRoutes = require("./routes/user.route");
const rentalListingsRoute = require("./routes/rental-listings.route");
const { addListings } = require("../../client/src/services/listings.service");

app.use(express.static("public/uploads"));
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", profileRoutes);
app.use("/api", userRoutes);
app.use("/api", rentalListingsRoute);

module.exports = app;
