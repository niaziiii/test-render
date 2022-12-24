const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    father: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: 'user'
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    report: [{
        type: mongoose.Schema.ObjectId,
        ref: 'report'
    }],
    cnic: String,
    phoneNumber: String,
    address: String,
    expire: String
});


userSchema.methods.correctPassword = async function (candidatePass, userPass) {
    return await bcrypt.compare(candidatePass, userPass)
}

const User = mongoose.model("User", userSchema);
module.exports = User;

