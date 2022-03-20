const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");

const Account = require("./account");

const bankpasSchema = new mongoose.Schema({
  iban: {
    type: String,
    required: true,
    trim: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
  update_at: {
    type: Date,
  },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
  },
});

bankpasSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("pincode")) {
      return next();
    }
    let pincodeHashed = await bcrypt.hash(this.pincode, 10);
    this.pincode = pincodeHashed;
    this.update_at = Date.now();
    return next();
  } catch (err) {
    return next(err);
  }
});

bankpasSchema.pre("remove", async function (next) {
  try {
    let account = await Account.findById(this.accountId);
    account.bankpas.remove(this.id);
    await account.save();
    return next();
  } catch (err) {
    return next(err);
  }
});

const Bankpas = mongoose.model("Bankpas", bankpasSchema);
module.exports = Bankpas;
