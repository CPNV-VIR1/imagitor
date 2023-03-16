const fs = require('fs');
const {loadImage, createCanvas} = require('canvas');
const width = 1200
const height = 650

const randomCharacters = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const loadImage = () => {
    const imageName = randomCharacters(15);
    loadImage(`./img/${imageName}`).then((data) => {
        context.drawImage(data, 340, 515, 70, 70)
        const imgBuffer = canvas.toBuffer('image/png')
        fs.writeFileSync('./resources/images/drawnImage.png', imgBuffer)
      })
}

exports.getImage = async (req, res) => {

    try {
        const image = await Image.findById(req.params.id);
        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }
        res.status(200).json(image);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

exports.createImage = async (req, res) => {
    try {
        const canvas = createCanvas(width, height)
        const context = canvas.getContext('2d')
        context.fillStyle = '#2b03a3'
        context.fillRect(0, 0, width, height)
        context.font = 'bold 72pt Menlo'
        context.textBaseline = 'top'
        context.textAlign = 'center'
        context.fillStyle = '#f7ab07'
        const imgText = res.body.image.textToImage
        const textAlign = context.measureText(imgText).width
        context.fillRect(590 - textAlign / 2 - 10, 170 - 5, textAlign + 20, 120)
        context.fillStyle = '#ffffff'
        context.fillText(imgText, 555, 120)
        context.fillStyle = '#ffffff'
        context.font = 'bold 32pt Menlo'
        context.fillText('positronx.io', 755, 600)

        const image = await Image.create(req.body);
        res.status(201).json(image);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}