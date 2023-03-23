let ImageController = require('../backend/controllers/imageController.js');
let NullInputException = require('../backend/controllers/NullInputException.js');

const { loadImage, createCanvas } = require('canvas');
const imgWidth = 1200
const imgHeight = 650

test('created image with inputs returns canvas', () => {

    //given
    const canvas = createCanvas(imgWidth, imgHeight);
    var image = ImageController.createImage("test");

    //when
    //Assertion will trigger the events

    expect(image).toEqual(canvas);
    //then
})
test('created image without inputs throws exception', () => {

    //given
    var image = ImageController.createImage("");

    //when
    //Assertion will trigger the events

    //then
    expect(image).toThrow(NullInputException);
})