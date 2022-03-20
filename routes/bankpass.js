const express = require("express");
const router = express.Router({ mergeParams: true });
const { createBankpas } = require("../handlers/bankpass");

router.route("/").post(createBankpas);

module.exports = router;
