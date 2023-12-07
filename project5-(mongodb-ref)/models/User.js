const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    notes: [
        {
            type: mongoose.Types.ObjectId,
            unique: true,
            ref: 'notes'
        }
    ]
})

const User = mongoose.model('users', UserSchema)

module.exports = { User }