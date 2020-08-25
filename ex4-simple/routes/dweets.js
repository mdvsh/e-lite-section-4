var express = require("express");
var router = express.Router();

// get controllers
var dweet_controller = require("../controllers/dweetController");
var user_controller = require("../controllers/userController")

// routes
router.get("/", dweet_controller.index);

// /dweet/create -> A route to create dweets
router.get("/create", dweet_controller.dweet_create_get);
router.post("/create", dweet_controller.dweet_create_post);

// /dweet/:id/delete -> A route to delete a dweet by its id
router.get("/:id/delete", dweet_controller.dweet_delete_get);
router.post("/:id/delete", dweet_controller.dweet_delete_post);

// /dweet/:id/update -> A route to update a dweet by its id
router.get("/:id/update", dweet_controller.dweet_update_get);
router.post("/:id/update", dweet_controller.dweet_update_post);

// /dweet/:id -> A route to fetch a dweet by its id
router.get("/:id", dweet_controller.dweet_detail);



module.exports = router;
