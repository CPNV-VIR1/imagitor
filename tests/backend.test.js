

const { loadImage, createCanvas } = require('canvas');
const { saveImage, getImageByName, getAllImages, createImage } = require('../backend/controllers/imageController.js');
const imgWidth = 1200;
const imgHeight = 650;

test('created image with inputs returns canvas', () => {

    //given
    const canvas = createCanvas(imgWidth, imgHeight);
    const image = createImage("test");

    //when
    //Assertion will trigger the events
    expect(image.imgWidth).toEqual(canvas.imgWidth);
    //then
})
test('created image without inputs returns undefined', () => {

    //given
    var image = createImage("");

    //when
    //Assertion will trigger the events

    //then
    expect(image.imgWidth).toEqual(undefined);
})