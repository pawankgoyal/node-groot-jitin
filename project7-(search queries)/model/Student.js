
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: Number,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    // address: {
    //     city: String,
    //     street: Number
    // },
    courses: [String],
});

const Student = mongoose.model('Student', studentSchema);

module.exports = { Student };
