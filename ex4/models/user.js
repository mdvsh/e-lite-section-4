var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: { type: String, maxlength: 100 },
  email: { type: String, minlength: 1 },
  password: { type: String, required: true, minlength: 8, maxlength: 100 },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
