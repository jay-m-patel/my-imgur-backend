const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    details: String
}, {
    timestamps: true
})

const Post = new mongoose.model('posts', postSchema)

module.exports = Post