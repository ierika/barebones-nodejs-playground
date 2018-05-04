const http = require('http');

// Function for calling the controller
function go(req, res) {
    let url = req.url;
    let hasRoute = false;

    for (let route of routes) {
        const [pattern, controllerName] = route;
        let regexp = new RegExp(pattern)
        if (url.match(regexp)) {
            hasRoute = true;
            // If the controller does not exist, use the base controller.
            let Controller;
            try {
                Controller = require(`./controllers/${controllerName}.js`).Controller;
            } catch (error) {
                console.error(error.message);
                console.info('Using base controller');
                Controller = require(`./core/Controller.js`).Controller;
            }
            const controller = new Controller(req, res);
            controller.render();
            break;
        };
    }

    if (! hasRoute) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end(http.STATUS_CODES[404]);
    }
}

// Declare routes and it's controller
const routes = new Set();
routes.add(['^/?$', 'IndexController']);
routes.add(['^/about/?$', 'AboutController']);
routes.add(['^/treehouse/?$', 'TreehouseController']);

module.exports.go = go;
