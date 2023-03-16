let ImageController = require('../backend/controllers/imageController.js');
let NullInputException = require('../backend/controllers/NullInputException.js');
test('created_image_with_inputs_returns_true', () => {

    //given
    var image = ImageController.createImage("test");

    //when
    //Assertion will trigger the events

    expect(image).toEqual(true);
    //then
})
test('created_image_without_inputs_throws_exception', () => {

    //given
    var image = ImageController.createImage("");

    //when
    //Assertion will trigger the events

    //then
    expect(image).toThrow(NullInputException);
})