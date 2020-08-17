const http = require("http");

// create server object
http.createServer((req, res) => {
    // write a response on a request
    res.write('How is world ?')
    res.write('\ntk bhyi')
    res.end()
}).listen(8000, () => console.log('Server fired at PORT 8000.'))

// lets make a legit web server now...