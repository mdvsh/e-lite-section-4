var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: { type: String, required: true, maxlength: 100 },
  email: { type: String, required: true, minlength: 1 },
});

module.exports = mongoose.model("User", UserSchema);
