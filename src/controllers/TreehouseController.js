const controller = require('../core/Controller.js');
const https = require('https');


class TreehouseController extends controller.Controller {
    render() {
        https.get('https://teamtreehouse.com/codeslikeagirl.json', (resp) => {
            let data = '';

            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                data = JSON.parse(data);
                const points = data.points;
                let list = '';

                for (let subject in points) {
                    if (subject === 'total') continue;
                    list += `<li><strong>${subject}: </strong>${points[subject]}</li>`;
                }
                
                let html = `
                    <ul>
                        <li>
                            <p><strong>Name: </strong>${data.name}</p>
                        </li>

                        <li>
                            <p><strong>Profile: </strong>${data.profile_name}</p>
                        </li>
                    </ul>

                    <h2>Total points: ${data.points.total}</h2>

                    <ul>
                        ${list}
                    </ul>
                `;

                this.res.writeHead(200, {'Content-Type': 'text/html'});
                this.res.end(html);
            });
         
        }).on("error", (err) => {
            this.res.writeHead(500, {'Content-Type': 'text/html'});
            this.res.end(err.message);
        });
    }
}

module.exports.Controller = TreehouseController;
