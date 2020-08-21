var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var BookInstanceSchema = new Schema({
  book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
  imprint: { type: String, required: true },
  // enum: specifies the set of allowed values for the field
  status: {
    type: String,
    required: true,
    enum: ["Available", "Maintenance", "Loaned", "Reserved"],
  },
  dueDate: { type: Date, default: Date.now },
});

// Virtual property for bookinstance url
BookInstanceSchema.virtual("url").get(function () {
  return "catalog/bookinstance/" + this.id;
});

module.exports = mongoose.model("BookInstance", BookInstanceSchema);
