const http = require('http');
const router = require('./router.js');
const config = require('./config.js').config;
const logger = require('./logger.js');

const server = http.createServer(function (req, res) {
    router.go(req, res);
}).listen(config.PORT);

logger.success(`Server has been established at ` +
               `http://localhost:${config.PORT}`.yellow);

server.on('error', err => {
    logger.error(err);
    process.exit(1);
});
