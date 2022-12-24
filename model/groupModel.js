const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    groupName: {
        type: String,
        required: true,
        unique: true
    },
    questions: [{
        // For Reference data inside
        type: mongoose.Schema.ObjectId,
        ref: 'questions'
    }]
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    });


const Groups = mongoose.model('groups', groupSchema);
module.exports = Groups;