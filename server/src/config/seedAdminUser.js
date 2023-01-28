const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const Profile = require("../models/profile.model");
exports.seedAdminUser = async () => {
  const exists = await User.findOne({
    role: "Admin",
    status: "Active",
  });
  if (exists) return;

  const user = new User();
  user.email = "iamfurqan97@gmail.com";
  user.username = "furqan";
  user.salt = await bcrypt.genSalt();
  user.password = await bcrypt.hash("admin", user.salt);
  user.role = "Admin";
  user.status = "Active";
  user.createdOn = new Date();
  await user.save();

  const profile = new Profile();
  profile.user = user._id;
  profile.fullname = "Furqan Nun Zahoor";
  profile.contactNo = "78787878787";
  profile.gender = "Male";

  await profile.save();
};
