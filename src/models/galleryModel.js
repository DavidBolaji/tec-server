const mongoose = require('../db/mongoose');

const gallerySchema = new mongoose.Schema({
    pic: {
        type: String,
      },   
}, {
    timestamps: true
})


const Gallery = mongoose.model('Gallery', gallerySchema);

module.exports = Gallery;