const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    "userId": {
        type: String,
        required: true
    },
    "post": {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Post', postSchema)