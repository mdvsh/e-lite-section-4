var express = require("express");
var router = express.Router();
var Dweet = require("../models/dweet")
var User = require("../models/user")

// without auth

router.post('/create', (req, res) => {
    var user = User.findById(req.user._id);
    var D = new Dweet({
        dweet: req.body.dweet,
        posted_by: user,
    })
    try {
        var savedDweet = D.save()
        res.json({dweet: savedDweet});
    } catch (err) {
        res.status(400).json({ errorm: err });
    }
})

module.exports = router;
