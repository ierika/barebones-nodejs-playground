const fs = require('fs');
const config = require('../config');


class Controller {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    render() {
        this.res.writeHead(200, {
            'Content-Type': 'text/html',
        });
        this.res.end(`
            <h1>This is the BaseController</h1>
            <p>You have requested: ${this.req.url}</p>
        `);
    }
}


class TemplateController extends Controller {
    getTemplate() {
        if (this.template) {
            return this.template;
        } else {
            throw Error('Template not set');
        }
    } 

    getContext() {
        if (this.context) {
            return this.context;
        } else {
            return {};
        }
    }

    bind(content, context) {
        for (let key in context) {
            let pattern = new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, "g");
            content = content.replace(pattern, context[key]);
        }
        return content;
    }

    render() {
        const filePath = `${config.BASEDIR}/views/${this.getTemplate()}`;

        try {
            const fileContents = fs.readFileSync(filePath, 'utf8');
            this.res.writeHead(200, {'Content-Type': 'text/html'});
            this.res.end(this.bind(fileContents, this.getContext()));
        } catch(err) {
            this.res.writeHead(500, {'Content-Type': 'text/html'});
            this.res.end(`
                <h1>Server Error</h1>
                <p>${err.message}</p>
            `);
        }
    }
}

module.exports = {
    Controller,
    TemplateController,
}
