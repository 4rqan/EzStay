const express = require("express");
const app = express();
require("./config/database").connect();
require("./config/seedAdminUser").seedAdminUser();
require("./config/seedStateCityData").seedStateCityData();
const authRoutes = require("./routes/auth.route");
const profileRoutes = require("./routes/profile.route");
const userRoutes = require("./routes/user.route");
const rentalListingsRoute = require("./routes/rental-listings.route");
const bookingRoute = require("./routes/booking.route");
const regionsRoute = require("./routes/region.route");
const workerRoute = require("./routes/worker.route");
const workerBookingRoute = require("./routes/worker-booking.route");
const paymentRoute = require("./routes/payment.route");
const paymentAccountRoute = require("./routes/payment-account.route");
const propertyRatingsRoute = require("./routes/property-raings.route");
app.use(express.static("public/uploads"));
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", profileRoutes);
app.use("/api", userRoutes);
app.use("/api", rentalListingsRoute);
app.use("/api", bookingRoute);
app.use("/api", regionsRoute);
app.use("/api", workerRoute);
app.use("/api", workerBookingRoute);
app.use("/api", paymentRoute);
app.use("/api", paymentAccountRoute);
app.use("/api", propertyRatingsRoute);

module.exports = app;
