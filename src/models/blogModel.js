
const mongoose = require('../db/mongoose');


const blogSchema = new mongoose.Schema({
    uploader: {
      type: mongoose.Schema.ObjectId,
      required: [true, 'A post must have an uploader'],
    //   ref: 'User',
    },
    title: {
        type: String,
        required: [true, 'A user must have a title'],
        trim: true
    },
    content: {
        type: String,
        required: [true, 'A user must have a content'],
    },
    img: {
        type: String,
        default: 'default.png',
    },
    
}, {
    timestamps: true
})


const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;