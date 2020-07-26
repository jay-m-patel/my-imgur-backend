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

User.on('index', function(err) {
    if (err) {
        console.error('User index error: %s', err);
    } else {
        console.info('User indexing complete');
    }
});

module.exports = User