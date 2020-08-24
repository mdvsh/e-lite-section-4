var express = require("express");
var helloRouter = express.Router();

helloRouter.get("/", (req, res) => {
  res.send(
    "<h2>Hello World! <br><br> try <code>/hello/(your_name)</code></h2>"
  );
});

helloRouter.get("/:name", (req, res) => {
  res.send(`<h2>Hello, ${req.params.name}!</h2> <br><br> Yes, that's all :\\`);
});

module.exports = helloRouter;
