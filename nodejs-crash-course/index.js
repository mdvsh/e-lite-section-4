const http = require("http");
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT || 8000;

const server = http.createServer((req, res) => {
  let filePath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : req.url
  );
  let extension = path.extname(filePath);
  // check extension name and set content type
  var mimeTypes = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".wav": "audio/wav",
    ".mp4": "video/mp4",
    ".woff": "application/font-woff",
    ".ttf": "application/font-ttf",
    ".eot": "application/vnd.ms-fontobject",
    ".otf": "application/font-otf",
    ".wasm": "application/wasm",
    "": "text/html"
  };
  var contentType = mimeTypes[extension] || "application/octet-stream";
  if (contentType == "text/html" && extension == "") filePath += ".html";
//   console.log(extension, contentType)
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code == "ENOENT") {
        // 404 not found
        fs.readFile(
          path.join(__dirname, "public", "404.html"),
          (err, content) => {
            if (err) throw err;
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(content, "utf-8");
          }
        );
      }
      else {
        // some random error related to server afaik
        res.writeHead(500)
        res.end(`F bhyi server error aa gaya: ${err.code}`)
      }
    }
    else {
        // successfull response yeet!
        res.writeHead(200, { "Content-Type": contentType });
        res.end(content, 'utf-8')
    }
  });

  //   if (req.url === "/") {
  //     fs.readFile(
  //       path.join(__dirname, "public", "index.html"),
  //       (err, content) => {
  //         if (err) throw err;
  //         res.writeHead(200, { "Content-Type": "text/html" });
  //         res.end(content);
  //       }
  //     );
  //   }
  //   if (req.url === "/about") {
  //     fs.readFile(
  //       path.join(__dirname, "public", "about.html"),
  //       (err, content) => {
  //         if (err) throw err;
  //         res.writeHead(200, { "Content-Type": "text/html" });
  //         res.end(content);
  //       }
  //     );
  //   }
});

server.listen(PORT, () => console.log(`Server fired up on ${PORT}`));
