const db = require("../models");
const jwt = require("jsonwebtoken");

exports.createBankpas = async function (req, res, next) {
  try {
    let bankpas = await db.Bankpas.create({
      iban: req.body.iban,
      pincode: req.body.pincode,
      account: req.params.id,
    });
    let { id, iban, account } = bankpas;
    let token = jwt.sign(
      {
        id,
        iban,
        account,
      },
      process.env.SECRET_KEY
    );
    let foundAccount = await db.Account.findById(req.params.id);
    foundAccount.bankpas.push(bankpas.id);
    await foundAccount.save();
    let foundBankpas = await db.Bankpas.findById(bankpas._id).populate(
      "account",
      {
        name: true,
        balance: true,
      }
    );
    return res.status(200).json({ foundBankpas, token });
  } catch (err) {
    return next(err);
  }
};
