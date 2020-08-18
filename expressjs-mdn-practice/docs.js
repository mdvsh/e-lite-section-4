// docs.js - Docs route module

var express = require("express");
var router = express.Router();

// home page route
router.get("/", function (req, res) {
  res.send("Docs home page");
});

// about page route
router.get("/about", function (req, res) {
  res.send("About these docs");
});

module.exports = router;
