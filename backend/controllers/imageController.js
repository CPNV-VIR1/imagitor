const fs = require('fs');
const { createCanvas } = require('canvas');
const imgWidth = 650
const imgHeight = 650
const path = require('path');
const { Image } = require('../models/image');


/**
 * It returns a string of random characters of a specified length.
 * @param length - The length of the string you want to generate.
 * @returns A string of random characters.
 */
const randomCharacters = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

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
    const imagesDir = path.join('backend', 'assets', 'images');
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
        const imagePath = path.join(__dirname, '..', 'backend', 'assets', 'images', imageName);
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
    return new Promise((resolve, reject) => {
        fs.readdir('images', (err, files) => {
            if (err) {
                reject(err);
            } else {
                resolve(files);
            }
        });
    });
}

/* Creating a canvas with the text you want to display. */
exports.createCanvasWithText = async(text = 'Texte par défaut') => {
    const canvas = createCanvas(imgWidth, imgHeight);
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'black';
    ctx.font = '30px sans-serif';
    ctx.fillText(text, 10, 100);
    return canvas;
}