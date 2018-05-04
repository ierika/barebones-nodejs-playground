const fs = require('fs');


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

    render() {
        const filePath = `./views/${this.getTemplate()}`;

        try {
            const fileContents = fs.readFileSync(filePath, 'utf8');
            this.res.writeHead(200, {'Content-Type': 'text/html'});
            this.res.end(fileContents.toString());
        } catch(err) {
            this.res.writeHead(500, {'Content-Type': 'text/html'});
            this.res.end(`
                <h1>Server Errror</h1>
                <p>${err.message}</p>
            `);
        }
    }
}

module.exports = {
    Controller,
    TemplateController,
}
