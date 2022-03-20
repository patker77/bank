const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  accounts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
    },
  ],
});

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    let passwordHashed = await bcrypt.hash(this.password, 10);
    this.password = passwordHashed;
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.comparePassword = async function (candidatepassword, next) {
  try {
    let isMatch = await bcrypt.compare(candidatepassword, this.password);
    return isMatch;
  } catch (err) {
    return next(err);
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
