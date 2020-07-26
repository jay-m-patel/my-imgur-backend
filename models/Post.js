const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    uploadedBy: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        },
        userName: {
            type: String,
            require: true
        }
    },
    title: {
        type: String,
        required: true
    },
    imgUrls: [{
        url: {
            type: String,
            required: true
        }
    }],
    details: String
}, {
    timestamps: true
})

const Post = new mongoose.model('posts', postSchema)

module.exports = Post