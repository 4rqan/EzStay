const mongoose = require("mongoose");

exports.connect = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/EzStayDB2", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to the mongo DB");
    })
    .catch((err) => {
      console.log("error in connecting Mongo DB\n" + err);
    });
};
