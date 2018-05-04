const controller = require('../core/Controller.js');


class IndexController extends controller.TemplateController {
    constructor(req, res) {
        super(req, res);
        this.template = 'index/index.html';
    }
}

module.exports.Controller = IndexController;
