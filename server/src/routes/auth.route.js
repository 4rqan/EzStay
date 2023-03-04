const express = require("express");
const route = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const Profile = require("../models/profile.model");

route.post("/signup", async (req, res) => {
  let { username, password, email, role, fullname, contactNo } = req.body;

  if (!email || !password || !username || !role) {
    return res.status(400).send("Please pass all required fields");
  }

  if (!(role == "Landlord" || role == "Tenant"))
    return res.status(400).send("Invalid user role");

  username = username.toLowerCase();
  email = email.toLowerCase();

  const usernameExists = await User.findOne({ username });
  if (usernameExists) {
    return res.status(400).send("Username already exists");
  }

  const emailExists = await User.findOne({ email });
  if (emailExists) {
    return res.status(400).send("Email already exists");
  }

  const user = new User();
  user.salt = await bcrypt.genSalt();
  const encryptedPassword = await bcrypt.hash(password, user.salt);
  user.password = encryptedPassword;
  user.email = email;
  user.username = username;
  user.role = role;
  user.status = "Active";
  user.approvedLL = false;
  user.createdOn = new Date();

  await user.save();

  const profile = new Profile();
  profile.fullname = fullname;
  profile.contactNo = contactNo;
  profile.user = user._id;
  await profile.save();
  res.send(generateToken(user));
});

route.post("/login", async (req, res) => {
  let { username, password } = req.body;

  if (!password || !username) {
    return res.status(400).send("Please pass all required fields");
  }
  username = username.toLowerCase();
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(404).send("Invalid username");
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(404).send("Incorrect password");
  }

  if (user.status == "Inactive")
    return res
      .status(401)
      .send("Your account is inactive. Kindly contact adminstrator");

  return res.send(generateToken(user));
});

const generateToken = (user) => {
  const token = jwt.sign(
    {
      username: user.username,
      email: user.email,
      userId: user._id,
      role: user.role,
    },
    process.env["JWT_SECRET"],
    { expiresIn: "2h" }
  );

  return {
    userId: user._id,
    username: user.username,
    email: user.email,
    token,
    role: user.role,
  };
};

module.exports = route;
