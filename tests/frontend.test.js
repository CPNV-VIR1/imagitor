let FrontEnd = require('../src/main.js');
test('input_is_text', () => {

    //given
    var image = FrontEnd.createImage("test");

    //when
    //Assertion will trigger the events

    expect(image).toEqual(true);
    //then
})
test('output_is_an_image', () => {

    //given
    var image = ImageController.createImage("");

    //when
    //Assertion will trigger the events

    //then
    expect(image).toThrow(NullInputException);
})