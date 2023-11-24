const mongoose = require('mongoose')

const NoteSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
        required: true
    }
})

const Note = mongoose.model('notes', NoteSchema)

module.exports = { Note }