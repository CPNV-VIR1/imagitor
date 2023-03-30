const { Image } = require('../backend/models/image');

describe('Image Model', () => {
    test('Image should be defined', () => {
        expect(Image).toBeDefined();
    });
});