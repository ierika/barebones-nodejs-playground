const routes = new Set();

routes.add(['^/?$', 'IndexController']);
routes.add(['^/index/?$', 'IndexController']);
routes.add(['^/about/?$', 'AboutController']);
routes.add(['^/treehouse/?$', 'TreehouseController']);

module.exports = { routes };
