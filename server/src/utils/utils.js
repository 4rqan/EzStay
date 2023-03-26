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

const sendMail = (to, subject, html, text) => {
  let transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env["MAIL_USERNAME"],
      pass: process.env["MAIL_PASSWORD"],
    },
  });

  const mailOptions = {
    from: process.env["MAIL_FROM"],
    to,
    subject,
    text,
    html,
  };

  transporter
    .sendMail(mailOptions)
    .then(() => {})
    .catch(() => {});
};

module.exports = { uploadMultiple, uploadSingle, deleteFileAsync, sendMail };
