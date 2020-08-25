var express = require('express');
var router = express.Router();
var dweet_controller = require("../controllers/dweetController");

// /dweets -> A route to fetch all dweets
router.get("/", dweet_controller.dweet_list);

module.exports = router;
