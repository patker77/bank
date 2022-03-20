const db = require("../models");
const jwt = require("jsonwebtoken");

exports.createAccount = async function (req, res, next) {
  try {
    let account = await db.Account.create({
      name: req.body.name,
      balance: req.body.balance,
      user: req.params.id,
      //user: req.body.user,
    });

    let foundUser = await db.User.findById(req.params.id);
    foundUser.accounts.push(account.id);
    await foundUser.save();
    let token = jwt.sign(
      {
        name: req.body.name,
      },
      process.env.SECRET_KEY
    );
    let foundAccount = await db.Account.findById(account._id).populate("user", {
      username: true,
      email: true,
    });
    return res.status(200).json({ foundAccount, token });
  } catch (err) {
    return next(err);
  }
};

// exports.getAccount = async function (req, res, next) {
//   try {
//   } catch (err) {}
// };
// const deleteAccount = async function (req, res, next) {
//   try {
//   } catch (err) {}
// };
// exports.withdraw = async function (req, res, next) {
//   try {
//   } catch (err) {}
// };
