var express = require("express");
var app = express();
var port = 8000;

var helloRouter = require("./routes/hello");

app.get("/", (req, res) => {
  res.send("<h1>Please proceed to <code>/hello</code>.</h1>");
});
app.use("/hello", helloRouter);

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
