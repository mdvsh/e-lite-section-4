var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var BookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, required: true, ref: "Author" },
  summary: { type: String, required: true },
  isbn: { type: String, required: true },
  genre: [{ type: Schema.Types.ObjectId, ref: "Genre" }],
});

// Virtual property for book url
BookSchema.virtual("url").get(function () {
  return "catalog/book/" + this._id;
});

module.exports = mongoose.model("Book", BookSchema);
