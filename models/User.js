const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isLoggedIn: Boolean,
    fullName: {
        type: String,
        required: true
    },
    favouritePosts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts'
    }]
})

const User = new mongoose.model('users', userSchema)

module.exports = User