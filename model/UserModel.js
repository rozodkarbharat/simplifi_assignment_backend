const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  title:String,
  email: String,
  number: Number,
  ISDcode: String,
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
