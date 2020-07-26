const cloudinary = require('./cloudinaryConfig')
const datauri = require('./bufferToString')

module.exports = async (originalname, buffer) => {
    try {
        const savedImg = await cloudinary.uploader.upload(datauri(originalname, buffer))
        return savedImg
    } catch(err) {
        console.log(err, 'cloudinaryUpload')
        return {
            errorName: err.name,
            errorMsg: err.message,
            error: err
        }
    }
}