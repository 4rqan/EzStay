const path = require("path");
const multer = require("multer");
const { promisify } = require("util");
const fs = require("fs");
const nodeMailer = require("nodemailer");

const storage = (folderName) => {
  let destination = "./public/uploads";
  if (folderName) destination += "/" + folderName;
  return multer.diskStorage({
    destination,
    filename: function (_, file, cb) {
      cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
    },
  });
};

const uploadMultiple = (name, folderName) => {
  return multer({
    storage: storage(folderName),
    limits: { fileSize: 1000000 },
  }).array(name);
};

const uploadSingle = (name, folderName) => {
  return multer({
    storage: storage(folderName),
    limits: { fileSize: 1000000 },
  }).single(name);
};

const deleteFileAsync = promisify(fs.unlink);

const sendMail = (to, subject, templateName, replacements) => {
  let html = fs.readFileSync("src/templates/" + templateName, "utf-8");

  Object.keys(replacements).forEach((key) => {
    html = html.replace(key, replacements[key]);
  });

  const auth = {
    user: process.env["MAIL_USERNAME"],
    pass: process.env["MAIL_PASSWORD"],
  };

  let transporter = nodeMailer.createTransport({
    host: process.env["SMTP_SERVER"],
    port: process.env["PORT"],
    secure: true,
    auth,
  });

  const mailOptions = {
    from: process.env["MAIL_FROM"],
    to,
    subject,
    html,
  };

  transporter
    .sendMail(mailOptions)
    .then(() => {})
    .catch((e) => {
      console.log(e);
    });
};

module.exports = { uploadMultiple, uploadSingle, deleteFileAsync, sendMail };
