const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    groupName: {
        type: String,
        required: true,
    },
    atemps: {
        type: String,
        required: true,
    },
    total: {
        type: String,
        required: true,
    },
    percentage: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    });

const Report = mongoose.model('report', reportSchema);
module.exports = Report;