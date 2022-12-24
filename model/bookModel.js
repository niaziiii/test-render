const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
        default: '/files/image/image1.png'
    }
});


const Books = mongoose.model('books', bookSchema);
module.exports = Books;