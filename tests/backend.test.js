const { loadImage, createCanvas } = require('canvas');
const { saveImage, getImageByName, getAllImages, createCanvasWithText } = require('../backend/controllers/imageController.js');
const { Image } = require('../backend/models/image');
const imgWidth = 1200;
const imgHeight = 650;

test('created image with inputs returns canvas', async () => {

    //given
    const canvas = createCanvas(imgWidth, imgHeight);
    const image = await createCanvasWithText("test");

    //when
    //Assertion will trigger the events
    expect(typeof image).toEqual(typeof canvas);
    //then
})
test('created image without inputs returns empty canvas', () => {

    //given
    var image = createCanvasWithText("");

    //when
    //Assertion will trigger the events

    //then
    expect(typeof image).toEqual(typeof createCanvas());
})

test('Get Image returns Image', () => {

    
    //given
    const image = createCanvasWithText("test");

    //when
    //Assertion will trigger the events

    //then
    expect(typeof image).toEqual(typeof getImageByName("test"));
})

test('Save Image returns PathName', async() => {


    //given
    const text = "test";
    const canvas = await createCanvasWithText(text);
    const pathName = await saveImage(canvas, "test");

    const imageName = await Image.findOne({ where: { text } });


    //when
    //Assertion will trigger the events

    //then
    expect(pathName).toEqual(imageName.filename);
})


test('Post image via API with text', async () => {
    


})
test('Post image via API without text', async () => {

})


test('Get Image via API with text', async () => {

})
test('Get Image via API without text', async () => {

})