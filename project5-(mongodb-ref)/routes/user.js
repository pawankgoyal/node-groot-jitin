const express = require('express')
const { body } = require('express-validator')
const { registerController } = require('../controllers/userControllers')
const r = express.Router()

const registerValidations = [
    body('email', "Invalid email").isEmail(),
    body('password', "password must be strong").isLength({ min: 5 }),
]

r.post('/register', registerValidations, registerController)

module.exports = r