const fs = require("fs");
const path = require("path");

fs.mkdir(path.join(__dirname, '/ex1-solns'), {}, function(err) {
    if (err) throw err;
    console.log('Starting calcuation...')
})

// fs.rename(
//   path.join(__dirname, `/ex1-files/${i}`),
//   path.join(__dirname, `/ex1-files/${i}.txt`),
//   (err) => {
//     if (err) throw err;
//     console.log("Converted to txt.");
//   }
// );

try {
  for (let i = 1; i < 11; i++) {
    var qfile = fs.readFileSync(
      path.join(__dirname, `/ex1-files/${i}.txt`),
      "utf-8",
      (err) => {
        if (err) throw err;
      }
    );
    var data = qfile.split(/\r?\n/);
    data.forEach((q) => {
      fs.appendFile(
        path.join(__dirname, `/ex1-solns/${i}.txt`),
        `${eval(q)}\n`,
        (err) => {
          if (err) throw err;
        }
      );
    });
  }
} catch (error) {
  console.log(error);
}

