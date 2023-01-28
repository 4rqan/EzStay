const express = require("express");
const app = express();
require("./config/database").connect();
require("./config/seedAdminUser").seedAdminUser();
const authRoutes = require("./routes/auth.route");
const profileRoutes = require("./routes/profile.route");
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", profileRoutes);

module.exports = app;
