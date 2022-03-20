const express = require("express");
const bodyParser = require("body-parser");
const errorHandler = require("./handlers/error");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const accountRoutes = require("./routes/accounts");
const bankpasRoutes = require("./routes/bankpass");

const { loginRequired, ensureCorrectUser } = require("./middleware/auth");

const app = express();
const cors = require("cors");

const PORT = 8443;

app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/users/:id/accounts", accountRoutes);
app.use(
  "/api/users/:id/account/:id/bankpass",
  loginRequired,
  ensureCorrectUser,
  bankpasRoutes
);

app.use(function (req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(PORT, function () {
  console.log(`Server is starting on port ${PORT}`);
});
