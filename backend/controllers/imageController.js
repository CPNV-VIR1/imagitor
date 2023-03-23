const fs = require('fs');
const { loadImage, createCanvas } = require('canvas');
const imgWidth = 1200
const imgHeight = 650
const path = require('path');

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

/* Saving the image to the images folder. */
exports.saveImage = async (image, imageName) => {
        const buffer = image.toBuffer('image/png');
        const filePath = path.join('backend', 'assets', 'images', imageName);
        await fs.promises.writeFile(filePath, buffer);
        return imageName; // Retournez seulement le nom du fichier
}

exports.getImageByName = async (imageName) => {
    return new Promise((resolve, reject) => {
      const imagePath = path.join('images', imageName);
      fs.access(imagePath, fs.constants.F_OK, (err) => {
        if (err) {
          resolve(null);
        } else {
          resolve(imagePath);
        }
      });
    });
  }

/* A function that is being exported to be used in another file. */
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

/* Creating a canvas with the text that is being passed in. */
exports.createImage = async (text) => {
    const canvas = createCanvas(imgWidth, imgHeight);
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'black';
    ctx.font = '30px sans-serif';
    ctx.fillText(text, 10, 100);

    return canvas;
}