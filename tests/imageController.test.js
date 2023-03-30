const fs = require('fs').promises;
const { Console } = require('console');
const path = require('path');
const {
    saveImage,
    getImageByName,
    getAllImages,
    createCanvasWithText
} = require('../backend/controllers/imageController');

describe('Image Controller', () => {
    let testText = "ruastique";
    const encodedTestText = encodeURIComponent(testText);
    let testImageName;

    beforeAll(async () => {
        const canvas = await createCanvasWithText(testText);
        testImageName = await saveImage(canvas, testText);
    });

    test('createCanvasWithText', async () => {
        const canvas = await createCanvasWithText(testText);
        expect(canvas).toBeDefined();
        expect(canvas.toDataURL()).toContain('data:image/png;base64');
    });

    test('saveImage', async () => {
        const canvas = await createCanvasWithText(testText);
        const imageName = await saveImage(canvas, (testText));
        const imagePath = path.join(__dirname, '..', 'backend', 'assets', 'images', imageName);
        expect(imageName).toBeDefined();
        expect(imageName).toContain(encodedTestText);
        expect(await fs.access(imagePath)).toBeUndefined();
    });

    test('getImageByName', async () => {
        const imagePath = await getImageByName(testImageName)
        expect(imagePath).toBeDefined();
        expect(imagePath).toContain(testImageName);
    });
});