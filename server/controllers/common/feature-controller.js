const Feature = require("../../models/Feature")

const addFeatureImage = async(req, res)=> {
    try {
        const { image } = req.body;
        console.log(image, "image on backend")

        const featureImages = new Feature({
            image
        })

        await featureImages.save();
        return res.status(200).json({
            success: true,
            data: featureImages
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Some error occured!",
            error: error.message
        })
    }
}
const getFeatureImage = async(req, res)=> {
    try {
        const images = await Feature.find({});

        return res.status(200).json({
            success: true,
            data: images
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Some error occured!",
            error: error.message
        })
    }
}

module.exports = {
    getFeatureImage,
    addFeatureImage
}