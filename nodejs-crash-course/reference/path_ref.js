const path = require('path');

// Base File Name

console.log(__filename) // this prints entire filename path
console.log(path.basename(__filename)) // this prints just the fname

// File Extension
console.log(path.extname(__filename))

// Create Path Object w/ root, dir, base, ext and name [VIMP]
console.log(path.parse(__filename))

// Concatenate paths
console.log(path.join(__dirname, 'test', 'foo.html'));