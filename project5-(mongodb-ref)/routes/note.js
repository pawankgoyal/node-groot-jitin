const express = require('express')
const { body } = require('express-validator')
const { addNoteController, getNotesController } = require('../controllers/noteControllers')
const r = express.Router()

const addNoteValidation = [
    body('title', "title must be string").isString(),
    body('content', "content must have 5 chars").isLength({ min: 5 }),
    body('user', "send a user id").isString(),
]

r.post('/', addNoteValidation, addNoteController)

r.get('/:userId', getNotesController)

module.exports = r