const express = require('express')

const { body } = require('express-validator');
const { registerController, loginController, getProfileController, sendSmsController, emailController } = require('../controllers/authControllers');
const r = express.Router()

const registerValidations = [
    body('name', "Name must be have 2 chars").isLength({ min: 2 }),
    body('email', "Invalid email").isEmail(),
    body('password', "password must be strong").isStrongPassword(),
]

const loginValidations = [
    body('email', "Invalid email").isEmail(),
    body('password', "password must be strong").notEmpty(),
]

const smsValidations = [
    body('message', "provide a 10 char message").isLength({ min: 10 }),
    body('to').isLength({ min: 10, max: 10 }).withMessage("to key must have 10 chars").isNumeric().withMessage("to key must be numaric"),
]

const emailValidations = [
    body('from', 'from must be an array').isEmail(),
    body('subject', "provide min 2 char message and max 100 chars").isLength({ min: 2, max: 200 }),
    body('to', 'to must be an array of emails').isArray(),
    body('content', 'provide min 2 char message and max 2000 chars').isLength({ min: 2, max: 2000 })
]

r.post('/register', registerValidations, registerController)

r.post('/login', loginValidations, loginController)

r.get('/profile', getProfileController)

r.post('/sendSms', smsValidations, sendSmsController)

r.post('/email', emailValidations, emailController)

module.exports = r