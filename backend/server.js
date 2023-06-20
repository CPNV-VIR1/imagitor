const http = require('http');
const querystring = require('querystring');
const fs = require('fs');
const { saveImage, getImageByName, getAllImages, createCanvasWithText } = require('./controllers/imageController');
const { initDatabase, createDatabaseIfNotExist } = require('./database/database');

const port = 5000;

(async () => {
    await createDatabaseIfNotExist();
    await initDatabase();
})();


const server = http.createServer(async (req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Preflight request. Reply successfully:
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    if (req.url.startsWith('/images')) {
        if (req.method === 'GET') {
            if (req.url === '/images') {
                const images = await getAllImages();
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(images));
            } else {
                const imageName = req.url.substring(7);
                const imagePath = await getImageByName(imageName);
                if (imagePath) {
                    res.writeHead(200, { 'Content-Type': 'image/png' });
                    res.end(fs.readFileSync(imagePath));
                } else {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('Image introuvable');
                }
            }
        }
        else if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });

            req.on('end', async () => {
                const postData = querystring.parse(body);
                const text = postData.text;
                if(text === "" || text === undefined || text === null){
                    res.writeHead(400, { 'Content-Type': 'text/plain' });
                    res.end('Le texte est vide');
                    return;
                }
                const image = await createCanvasWithText(text);
                const imagePath = await saveImage(image, text);
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(imagePath);
            });

        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Seules les requêtes POST sont autorisées');
        }
    }
});

server.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});
