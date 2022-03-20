const mongoose = require("mongoose");

mongoose.Promise = Promise;

mongoose.connect("mongodb://localhost:27017/bank", {
  keepAlive: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // we're connected!
  console.log("the database is connected");
});

module.exports.User = require("./user");
module.exports.Account = require("./account");
module.exports.Bankpas = require("./bankpas");
