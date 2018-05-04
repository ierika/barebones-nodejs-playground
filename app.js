const http = require('http');
const router = require('./router.js');
const config = require('./config.js').config;

const server = http.createServer(function (req, res) {
    console.log(req.url);
    router.go(req, res);
}).listen(config.PORT);
console.log(`Server has been established at port ${config.PORT}`);
