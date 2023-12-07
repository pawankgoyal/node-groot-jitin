const express = require('express')
const { body } = require('express-validator')
const { registerController, getUserProfileController } = require('../controllers/userControllers')
const r = express.Router()

const registerValidations = [
    body('email', "Invalid email").isEmail(),
    body('password', "password must have 5 chars").isLength({ min: 5 }),
]

r.post('/register', registerValidations, registerController)

r.get('/userProfile/:userId', getUserProfileController)

module.exports = r