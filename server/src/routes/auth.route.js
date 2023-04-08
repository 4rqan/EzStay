const express = require("express");
const route = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const Profile = require("../models/profile.model");
const requireAuth = require("../middlewares/requireAuth");
const randomstring = require("randomstring");
const { sendMail } = require("../utils/utils");

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
  profile.email = email;
  profile.contactNo = contactNo;
  profile.user = user._id;
  await profile.save();
  res.send(generateToken(user, profile));
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

  const profile = await Profile.findOne({ user: user._id });

  return res.send(generateToken(user, profile));
});

route.put("/changepassword", requireAuth, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.user.userId);

  const validPassword = await bcrypt.compare(oldPassword, user.password);
  if (!validPassword) {
    return res.status(404).send("Incorrect password");
  }

  user.salt = await bcrypt.genSalt();
  const encryptedPassword = await bcrypt.hash(newPassword, user.salt);
  user.password = encryptedPassword;
  await user.save();
  res.send("Password changed successfully");
});

const generateToken = (user, profile) => {
  const token = jwt.sign(
    {
      username: user.username,
      email: user.email,
      userId: user._id,
      role: user.role,
      profileId: profile._id,
      fullname: profile.fullname,
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
    profileId: profile._id,
  };
};

route.post("/forgotpassword", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).send("Invalid email");

  user.resetLink = randomstring.generate();
  await user.save();

  const link =
    process.env["CLIENT_URL"] +
    "/resetpassword?resetLink=" +
    user.resetLink +
    "&email=" +
    email;

  const replacements = {
    "[MESSAGE1]":
      "We have sent you this email in response to your request to reset your password on company name.",
    "[MESSAGE2]": "To reset your password, please follow the link below:",
    "[MESSAGE3]": `<a href="${link}">Reset Password</a>`,
    "[MESSAGE4]": "",
  };

  sendMail(
    email,
    "Please reset your Password",
    "general-template.html",
    replacements
  );

  res.send("Kindly check your email");
});

route.post("/resetPassword", async (req, res) => {
  const { email, resetLink, newPassword } = req.body;
  if (!resetLink) return res.status(400).send("Invalid link");
  const user = await User.findOne({ email, resetLink });

  if (!user) return res.status(400).send("Invalid link");

  user.resetLink = "";
  user.salt = await bcrypt.genSalt();
  user.password = await bcrypt.hash(newPassword, user.salt);
  await user.save();
  res.send("Password reset successfully.");
});

module.exports = route;
