var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxlength: 100 },
  family_name: { type: String, required: true, maxlength: 100 },
  dob: { type: Date },
  dod: { type: Date },
});

// Virtual property for fullname
AuthorSchema.virtual("name").get(function () {
  // To avoid errors in cases where an author does not have either a family name or first name
  // We want to make sure we handle the exception by returning an empty string for that case
  var fname = "";
  if (this.first_name && this.family_name) {
    fname = this.first_name + " " + this.family_name;
  }
  if (!this.first_name || !this.family_name) {
    fname = "";
  }
  return fname;
});

// Virtual property author's lifespan
AuthorSchema.virtual("lifespan").get(function () {
  return (this.dod.getYear() - this.dob.getYear()).toString();
});

// Virtual property for author's url
AuthorSchema.virtual("url").get(function () {
  return "/catalog/author" + this._id;
});

module.exports = mongoose.model("Author", AuthorSchema);
