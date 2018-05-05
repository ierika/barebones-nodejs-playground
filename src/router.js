const http = require('http');
const logger = require('./logger.js');
const colors = require('colors');


// Function for calling the controller
function go(req, res) {
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
                Controller = require(`./controllers/${controllerName}.js`).Controller;
                logger.log(`Using ${controllerName}`);
            } catch (error) {
                logger.error(error.message);
                logger.log('Using base controller');
                Controller = require(`./core/Controller.js`).Controller;
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

// Declare routes and it's controller
const routes = new Set();
routes.add(['^/?$', 'IndexController']);
routes.add(['^/about/?$', 'AboutController']);
routes.add(['^/treehouse/?$', 'TreehouseController']);

module.exports.go = go;
