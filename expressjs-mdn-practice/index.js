// Express hello world
var express = require("express");
var app = express();
var docs = require("./docs");
app.use(express.static('public'))

app.get("/", (req, res) => {
  res.send("Hello World!\nHow are you?");
});

app.use(docs);

// middleware example
var a_sample_middleware_func = function (req, res, next) {
  console.log("Middleware says helo...");
  next(); // [VIMP] Call next() so Express will call the next middleware function in the chain.
};

// Function added with use() for all routes and verbs
// app.use(a_middleware_function);

// Function added with use() for a specific route
app.use('/foo', a_sample_middleware_func);

// A middleware function added for a specific HTTP verb and route
app.get('/', a_sample_middleware_func);

app.listen(8000, () => {
  console.log("Express App listening on port 8000!");
});
