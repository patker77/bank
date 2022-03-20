const { default: mongoose } = require("mongoose");
const { Bankpas } = require(".");

const accountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  balance: {
    type: Number,
    required: true,
    default: 0,
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  bankpas: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bankpas",
    },
  ],
});

accountSchema.pre("remove", async function (next) {
  try {
    let user = await Bankpas.findById(this.userId);
    user.accounts.remove(this.id);
    await user.save();
    return next();
  } catch (err) {
    return next(err);
  }
});

const Account = mongoose.model("Account", accountSchema);
module.exports = Account;
