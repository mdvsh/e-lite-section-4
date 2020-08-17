const fs = require("fs");
const path = require("path");

// Create folder (asynchrous by default), takes in a callback
fs.mkdir(path.join(__dirname, "/test_folder"), {}, function (err) {
  if (err) throw err;
  console.log("Folder created...");
});

// Create and write to file
fs.writeFile(
  path.join(__dirname, "/test_folder", "hello.txt"),
  "node is epic bhai!",
  (err) => {
    if (err) throw err;
    console.log(`File written to ${__dirname}`);

    // Append to file (here, since asynchrous hai to callback bana dia)
    fs.appendFile(
      path.join(__dirname, "/test_folder", "hello.txt"),
      "\nhow is world ?",
      (err) => {
        if (err) throw err;
        console.log("Appended to file...");
      }
    );
  }
);

// Read File
fs.readFile(
  path.join(__dirname, "/test_folder", "hello.txt"),
  "utf-8",
  (err, data) => {
    if (err) throw err;
    console.log(data);
  }
);

// Rename a file
fs.rename(
  path.join(__dirname, "./test_folder", "hello.txt"),
  path.join(__dirname, "./test_folder", "renamed_hello.txt"),
  (err) => {
    if (err) throw err;
    console.log("File renamed...");
  }
);
