var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var moment = require("moment");
var DweetSchema = new Schema({
  dweet: {
    type: String,
    maxlength: 140,
    required: true,
  },
  posted_by: { type: Schema.ObjectId, ref: "User" },
  test: { type: String, required: true, minlength: 5, maxlength: 100 },
  posted_at: { type: Date, default: Date.now },
  last_updated_at: { type: Date, default: Date.now },
});

// Virtual for book's URL
DweetSchema.virtual("url").get(function () {
  return "/dweet/" + this._id;
});

DweetSchema.virtual("formatted_date").get(function () {
  return moment(this.last_updated_at).format("hh:mm A, dddd, Do MMM, YYYY")
});

module.exports = mongoose.model("Dweet", DweetSchema);
