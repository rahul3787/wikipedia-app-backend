const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
let UserSchema = new Schema({
  // name: {
  //   type: String,
  //   required: true
  // },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
  // date: {
  //   type: Date,
  //   default: Date.now
  // }
});
module.exports = UserSchema = mongoose.model("users", UserSchema);