var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var port = process.env.PORT || 8000;
var passport = require("passport");
var auth = require("./routes/auth");

var app = express();
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

var db = require("./config/keys").mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB successfully connected."))
  .catch((err) => console.log(err));

app.use(passport.initialize());
require("./config/passport")(passport);
app.use("/api/auth", auth);

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
