const http = require('http');
const logger = require('../logger');


// Function for calling the controller
function goTo(req, res, routes) {
    let hasRoute = false;

    logger.log(`Got a ${req.method} request at ` + `${req.url}`.yellow);

    for (let route of routes) {
        const [pattern, controllerName] = route;
        let regexp = new RegExp(pattern)
        if (req.url.match(regexp)) {
            hasRoute = true;
            // If the controller does not exist, use the base controller.
            let Controller;
            try {
                Controller = require(`../controllers/${controllerName}.js`).Controller;
                logger.log(`Using ${controllerName}`);
            } catch (error) {
                logger.error(error.message);
                logger.log('Using base controller');
                Controller = require(`./controller.js`).Controller;
            }
            const controller = new Controller(req, res);
            controller.render();
            break;
        };
    }

    if (! hasRoute) {
        let err = http.STATUS_CODES[404];
        logger.error(err);
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end(err);
    }
}

module.exports = { goTo };
