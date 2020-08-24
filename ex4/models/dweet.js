var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var DweetSchema = new Schema({
  dweet: {
    type: String,
    maxlength: 140,
    required: True,
  },
  posted_by: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  las_updated_at: { type: Date, default: Date.now },
});

DweetSchema.pre("update ", (next) => {
  this.last_updated_at = new Date();
  next();
});

module.exports = mongoose.model("Dweet", DweetSchema);
