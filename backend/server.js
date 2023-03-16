'use strict';
const http = require('http');
const { getImage, createImage } = require('./controllers/imageController');

const app = http.createServer((req, res) => {
    res.writeHeader(200, 'Access-Control-Allow-Origin', 'http://127.0.0.1:5173');
    res.writeHeader(200, 'Access-Control-Allow-Methods', 'OPTIONS', 'GET', 'POST');
    res.writeHeader(200, 'Access-Control-Allow-Headers', 'Content-Type');
    res.writeHeader(200, 'Access-Control-Max-Age', 2592000); // 30 days

    console.log()

    if (req.url === '/image' && req.headers['access-control-request-method'] === 'GET') {
        console.log('lflflfl');

       /* if(req.body.image) {
            console.log(req.params.id)
        }*/
        //getImage(req, res);
    } else if (req.url === '/image' && req.headers['access-control-request-method'] === 'POST') {
        console.log("flsmlsdmflk")
        createImage(req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));