var Dweet = require("../models/dweet");
var user = require("../models/user");
const { body, validationResult } = require("express-validator/check");
const { sanitizeBody } = require("express-validator/filter");
exports.index = function (req, res) {
  res.send(
    "<marquee width= '50%'>i srsly dont know what this page is supposed to do</marquee>"
  );
};
var async = require("async");
// read operation
exports.dweet_list = function (req, res, next) {
  Dweet.find({})
    .populate("posted_by")
    .exec(function (err, data) {
      if (err) throw err;
      res.render("dweet_list", { title: "Dweet List", dweet_list: data });
    });
};
exports.dweet_detail = function (req, res) {
  Dweet.findById(req.params.id)
    .populate("user")
    .exec(function (err, dweet) {
      if (err) throw err;
      res.render("dweet_detail", { title: "d dweet", ddetail: dweet });
    });
};

// create operations
exports.dweet_create_get = function (req, res) {
  res.render("create_dweet", { title: "Create a new Dweet" });
};

exports.dweet_create_post = [
  body("dweet", "dweet must not be empty.")
    .isLength({ min: 1, max: 140 })
    .trim(),
  body("test", "Author must not be empty.").isLength({ min: 1 }).trim(),

  sanitizeBody("*").escape(),
  // Process request after validation and sanitization.
  (req, res, next) => {
    const errors = validationResult(req);

    var d = new Dweet({
      dweet: req.body.dweet,
      test: req.body.test,
    });

    if (!errors.isEmpty()) {
      async.parallel(function (err, results) {
        if (err) {
          return next(err);
        }
        res.render("create_dweet", {
          title: "Create dweet",
          data: d,
          errors: errors.array(),
        });
      });
      return;
    } else {
      // Data from form is valid. Save dweet.
      d.save(function (err) {
        if (err) {
          return next(err);
        }
        // Successful - redirect to new dweet record.
        res.redirect(d.url);
      });
    }
  },
];

// delete operations
exports.dweet_delete_get = function (req, res) {
  async.parallel(
    {
      dweet: function (callback) {
        Dweet.findById(req.params.id).populate("user").exec(callback);
      },
    },
    function (err, results) {
      if (err) return next(err);
      if (results.dweet == null) {
        // no such dweet so redirect to dweet list
        res.redirect("/dweets");
      }
      res.render("delete_dweet", { title: "Delete dweet :\\ ", data: results.dweet });
    }
  );
};
exports.dweet_delete_post = function (req, res, next) {
    async.parallel({
        dweet: function (callback) {
            Dweet.findById(req.body.dweetid).exec(callback);
        }
    }, function (err, results) {
        if (err) {return next(err)}
        Dweet.findByIdAndRemove(req.body.dweetid, function deleteDweet(err) {
            if (err) {return next(err)}
            res.redirect('/dweets')
        })
    })
};

// update operations
exports.dweet_update_get = function (req, res) {
  async.parallel(
    {
      dweet: function (callback) {
        Dweet.findById(req.params.id).populate("user").exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.dweet == null) {
        var err = new Error("Dweet not found");
        err.status = 404;
        return next(err);
      }
      res.render("create_dweet", {
        title: "Update a previous dweet",
        data: results.dweet,
      });
    }
  );
};

exports.dweet_update_post = [
  // Validate fields.
  body("dweet", "dweet must not be empty.")
    .isLength({ min: 1, max: 140 })
    .trim(),
  body("test", "Author must not be empty.").isLength({ min: 1 }).trim(),

  sanitizeBody("dweet").escape(),
  sanitizeBody("test").escape(),

  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    var d = new Dweet({
      dweet: req.body.dweet,
      test: req.body.test,
      last_updated_at: Date.now,
      _id: req.params.id, // vimp brooo
    });

    if (!errors.isEmpty()) {
      async.parallel({}, function (err, results) {
        if (err) {
          return next(err);
        }
        res.render("create_dweet", {
          title: "Update a previous dweet",
          data: d,
          errors: errors.array(),
        });
      });
      return;
    } else {
      Dweet.findByIdAndUpdate(req.params.id, d, {}, function (err, ddweet) {
        if (err) {
          return next(err);
        }
        res.redirect(ddweet.url);
      });
    }
  },
];
