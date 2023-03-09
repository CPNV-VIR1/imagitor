const http = require('http');
const { getImage, createImage } = require('./controllers/imageController');


const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
    res.setHeader('Access-Control-Max-Age', 2592000); // 30 days


    if (req.url === '/image' && req.method === 'GET') {
        if(req.params.id) {
            console.log(req.params.id)
        }
        getImage(req, res);
    } else if (req.url === '/image' && req.method === 'POST') {

        createImage(req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));