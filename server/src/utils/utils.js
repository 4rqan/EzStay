const path = require("path");
const multer = require("multer");
const { promisify } = require("util");
const fs = require("fs");

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

module.exports = { uploadMultiple, uploadSingle, deleteFileAsync };
