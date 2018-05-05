const http = require('http');
const routes = require('./routes').routes;
const router = require('./core/router');
const config = require('./config');
const logger = require('./logger');

const server = http.createServer((req, res) => {
    router.goTo(req, res, routes);
}).listen(config.PORT);

logger.success(`Server has been established at ` +
               `http://localhost:${config.PORT}`.yellow);

server.on('error', err => {
    logger.error(err);
    process.exit(1);
});
