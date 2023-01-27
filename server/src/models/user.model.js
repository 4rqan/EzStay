const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : {unique: true, type: String},
    email: {unique: true, type: String},
    password: String,
    role: String,
    createdOn : Date
})

module.exports = mongoose.model('user', userSchema);