const cloudinaryUpload = require('./../utilities/cloudinaryUpload')
const User = require('./../models/User')
const Post = require('./../models/Post')

const errorName = 'errorName'
const errorMsg = 'errorMsg'


module.exports.newPost = async (req, res) => {
    try {
        const uploadedFunc = async files => {
            let uploadedUrl = []
            for(let i = 0; i < files.length; i++) {
                const uploadedFile = await cloudinaryUpload(files[i].originalname, files[i].buffer)
                const len = uploadedUrl.push({url: uploadedFile.secure_url})
                if(len === files.length) return uploadedUrl
            }
        }
        const uploadedUrl = await uploadedFunc(req.files)

        const newPost = new Post({
            uploadedBy: {
                id: req.user._id,
                userName: req.user.userName
            },
            title: req.body.title,
            imgUrls: uploadedUrl,
            details: req.body.details
        })
        
        const savedPost = await newPost.save()

        res.json({
            newPost: savedPost
        })

    } catch(err) {
        res.json({
            [errorName]: err.name,
            [errorMsg]: err.message,
            error: err
        })
    }
}