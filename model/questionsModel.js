const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Qustion must have title"]
    },
    correct: {
        type: String,
        required: true,
    },
    options: Array,
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    });


const Questions = mongoose.model('questions', questionSchema);
module.exports = Questions;