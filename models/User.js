const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: 'Username is required',
        unique: true,
    },
    password: {
        type: String,
        required: 'Password is required',
        unique: true,
    },
    roles: [{
        type: String,
        ref: 'Role'
    }]
})

module.exports = mongoose.model('User', userSchema)