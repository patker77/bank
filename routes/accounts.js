const express = require("express");
const router = express.Router({ mergeParams: true });
const { createAccount } = require("../handlers/accounts");

router.route("/").post(createAccount);

module.exports = router;
