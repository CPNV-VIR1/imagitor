const fs = require('fs');
const { createCanvas } = require('canvas');
const path = require('path');
const { Image } = require('../models/image');

// Properties of the image size
const imgWidth = 650
const imgHeight = 650

/* Saving the image to the backend/assets/images folder. */
exports.saveImage = async (image, text) => {
    // Vérifiez si l'image existe déjà dans la base de données
    const existingImage = await Image.findOne({ where: { text } });
    if (existingImage) {
        // Si l'image existe déjà, retournez simplement le nom du fichier existant
        return existingImage.filename;
    }
    const buffer = image.toBuffer('image/png');
    const imageName = `${Date.now()}_${encodeURIComponent(text)}.svg`;
    /* Joining the path of the images directory. */
    const imagesDir = path.join('assets', 'images');
    const filePath = path.join(imagesDir, imageName);

    try {
        await fs.promises.access(imagesDir, fs.constants.F_OK);
    } catch (err) {
        await fs.promises.mkdir(imagesDir, { recursive: true });
    }

    await fs.promises.writeFile(filePath, buffer);
    await Image.create({ text, filename: imageName });
    return imageName; // Retournez seulement le nom du fichier
}

/* Checking if the image exists and return them. */
exports.getImageByName = async (imageName) => {
    return new Promise((resolve, reject) => {
        if (imageName === "") {
            resolve(null);
        }
        const imagePath = path.join(__dirname, '..', 'assets', 'images', imageName);
        fs.access(imagePath, fs.constants.F_OK, (err) => {
            if (err) {
                resolve(null);
            } else {
                resolve(imagePath);
            }
        });
    });
}

/* A function that returns a promise. */
exports.getAllImages = async () => {
    try {
        const images = await Image.findAll();
        if (images.length === 0) {
            return []; // Retourner un tableau vide si aucune image n'est disponible
        }
        return images.map(image => {
            return {
                text: image.text,
                filename: image.filename,
            };
        });
    } catch (err) {
        throw new Error("Erreur lors de la récupération des images : " + err.message);
    }
};

/* Creating a canvas with the text you want to display. */
exports.createCanvasWithText = async (text = 'Texte par défaut') => {
    const canvas = createCanvas(imgWidth, imgHeight);
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'black';
    ctx.font = '30px sans-serif';
    ctx.fillText(text, 10, 100);
    return canvas;
}