const http = require('http');
const querystring = require('querystring');
const fs = require('fs');
const { saveImage, getImageByName, getAllImages, createImage } = require('./controllers/imageController');
const path = require('path');
const { Image } = require('./models/image');
const url = require('url');
const { promisify } = require('util');
const stat = promisify(fs.stat);
const sequelize = require('./database/database');

const port = 5000;

async function initDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Connexion à la base de données établie avec succès.');
        await sequelize.sync({ alter: true });
        console.log('Les modèles ont été synchronisés avec la base de données.');
    } catch (error) {
        console.error('Impossible de se connecter à la base de données:', error);
    }
}

initDatabase();

const server = http.createServer(async (req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5173');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Preflight request. Reply successfully:
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    if (req.url.startsWith('/image')) {

        if (req.method === 'GET') {
            if (req.url === '/image') {
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
        } else if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });

            req.on('end', async () => {
                const postData = querystring.parse(body);
                const text = postData.text || 'Texte par défaut';

                const image = await createImage(text);

                const imagePath = await saveImage(image, text);

                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(imagePath);
            });

        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Seules les requêtes POST sont autorisées');
        }
    }

    else if (req.url.startsWith('/static') && req.method === 'GET') {
        const reqPath = url.parse(req.url).pathname;
        const filePath = path.join(__dirname, 'assets', 'images', reqPath.substr(7));

        try {
            await stat(filePath);
            res.writeHead(200, { 'Content-Type': 'image/png' });
            res.end(fs.readFileSync(filePath));
        } catch (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Fichier introuvable');
        }
    }

    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page introuvable');
    }
});

server.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});