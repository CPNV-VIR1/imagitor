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
        const image = await Image.create(req.body);
        res.status(201).json(image);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}