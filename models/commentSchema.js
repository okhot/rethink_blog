const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    blog: {type: mongoose.Schema.ObjectId, ref: "blog"},
    content: {
        type: String,
        required: true
    },
    userInfo: {
        name: String,
        email: String
    },
    likes: {
        type: Number,
        default: 0 
    },
    dislikes: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model("comment", commentSchema)