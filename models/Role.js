const mongoose = require('mongoose')

const roleSchema = new mongoose.Schema({
    value: {
        type: String,
        default: 'USER',
        unique: true,
    },
    
})

module.exports = mongoose.model('Role', roleSchema)