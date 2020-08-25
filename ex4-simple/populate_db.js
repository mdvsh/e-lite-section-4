console.log("Sample filling of dweets in the mongodb database.");
var async = require("async");
var Dweet = require("./models/dweet");
var User = require("./models/user");
require("dotenv").config();

var mongoose = require("mongoose");
var mongoDB = `mongodb+srv://god:${process.env.PSWD}@dweeter-ex4.xkhgv.gcp.mongodb.net/${process.env.NAME}?retryWrites=true&w=majority`;
mongoose.connect(
  mongoDB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) throw err;
    console.log("MongoDB connection established.");
  }
);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var dweets = [];
var users = [];

function userCreate(name, email, cb) {
  var user = new User({ name: name, email: email });

  user.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New User: " + user);
    users.push(user);
    cb(null, user);
  });
}

function dweetCreate(content, poster, test, cb) {
  var aDweet = new Dweet({ dweet: content, posted_by: poster, test: test });

  aDweet.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Dweet " + aDweet);
    dweets.push(aDweet);
    cb(null, aDweet);
  });
}

function createUsers(cb) {
  async.series(
    [
      function (callback) {
        userCreate("Madhav Shekhar", "shekharmadhav03@gmail.com", callback);
      },
      function (callback) {
        userCreate(
          "Soumitra Shewale",
          "soumitrashewaledev@gmail.com",
          callback
        );
      },
      function (callback) {
        userCreate("Kavin Valli", "kavinvalli@gmail.com", callback);
      },
    ],
    cb
  );
}

function createDweets(cb) {
  async.parallel(
    [
      function (callback) {
        dweetCreate(
          "Lorem ipsum dolor sit amet, consectetuer adipiscin",
          users[0],
          'Madhav Shekhar',
          callback
        );
      },
      function (callback) {
        dweetCreate(
          "A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring",
          users[1],
          'Soumitra Shewale',
          callback
        );
      },
      function (callback) {
        dweetCreate(
          "Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musi",
          users[1],
          'Soumitra Shewale',
          callback
        );
      },
      function (callback) {
        dweetCreate(
          "The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV q",
          users[2],
          'Kavin Valli',
          callback
        );
      },
      function (callback) {
        dweetCreate(
          "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live.",
          users[0],
          'Madhav Shekhar',
          callback
        );
      },
      function (callback) {
        dweetCreate(
          "The European languages are members of the same family. Their separate existence is a myth.",
          users[2],
          'Kavin Valli',
          callback
        );
      },
      function (callback) {
        dweetCreate(
          'abc def ghi jkl mno pqrs tuv wxyz ABC DEF GHI JKL MNO PQRS TUV WXYZ !"§ $%& /() =?*',
          users[1],
          'Soumitra Shewale',
          callback
        );
      },
    ],
    cb
  );
}

async.series(
  [createUsers, createDweets], // Optional callback
  function (err, results) {
    if (err) {
      console.log("ERR: " + err);
    } else {
      console.log("DWEETS: " + dweets);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
