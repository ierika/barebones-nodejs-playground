const controller = require('../core/Controller.js');


class IndexController extends controller.TemplateController {
    constructor(req, res) {
        super(req, res);
        this.template = 'index/index.html';
    }

    getContext() {
        const context = {};
        context.siteName = "Learning NodeJS";
        context.variable_name = "This is a converted variable name."
        return context;
    }
}

module.exports.Controller = IndexController;
