let ImageController = require('../backend/controllers/imageController.js');
let NullInputException = require('../backend/controllers/NullInputException.js');
test('created image with inputs returns true', () => {

    //given
    var image = ImageController.createImage("test");

    //when
    //Assertion will trigger the events

    expect(image).toEqual(true);
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