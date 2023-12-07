const { validationResult } = require("express-validator");
const { Note } = require("../models/Note");
const { User } = require("../models/User");

const addNoteController = async (req, res) => {

    try {
        const result = validationResult(req);

        if (!result.isEmpty()) {
            return res.send({ errors: result.array() });
        }

        const note = await Note.create(req.body);

        await User.findByIdAndUpdate(req.body.user, { $push: { notes: { $each: [note._id] } } })

        res.json(note)
    } catch (error) {
        res.status(500).json({ err: error.message })
    }

}

const getNotesController = async (req, res) => {
    try {
        const userId = req.params.userId

        const notes = await Note.find({ user: userId }).populate('user')
        res.json(notes)
    } catch (error) {
        res.status(500).json({ err: error.message })
    }

}

module.exports = { addNoteController, getNotesController }