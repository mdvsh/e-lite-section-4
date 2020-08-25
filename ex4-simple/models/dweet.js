var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var User = require("../models/user");

var DweetSchema = new Schema({
  dweet: {
    type: String,
    maxlength: 140,
    required: true,
  },
  posted_by: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  // posted_by: { type: String, required: true }
  posted_at: { type: Date, default: Date.now },
  last_updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Dweet", DweetSchema);
