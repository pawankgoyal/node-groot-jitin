const express = require('express')
const twilio = require('twilio');
const User = require('../models/User')
const bcrypt = require('bcrypt');
const { validationResult, body } = require('express-validator');

const r = express.Router()
const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;

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

r.post('/register', registerValidations, async (req, res) => {
    try {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.send({ errors: result.array() });
        }

        const { name, email, password } = req.body

        // if (!name) {
        //     return res.send({ err: "name is required" })
        // } else if (!email) {
        //     return res.send({ err: "email is required" })
        // } else if (!password) {
        //     return res.send({ err: "password is required" })
        // }

        const user = await User.findOne({ email: req.body.email });

        const salt = bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashSync(password, salt)

        req.body.password = hashPassword;

        // null, undefined , 0 => false
        if (user) {
            return res.send({ err: "user already exists" })
        }

        let response = await User.create(req.body);
        let data = JSON.parse(JSON.stringify(response))
        delete data.password

        console.log(data)
        res.send(data)
    } catch (error) {
        console.log(error)
        res.send({ err: error.message })
    }

})

r.post('/login', loginValidations, async (req, res) => {

    try {

        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.send({ errors: result.array() });
        }

        const { email, password } = req.body;
        const user = await User.findOne({ email: email })

        if (!user) {
            return res.status(404).send({ err: 'user does not exists' })
        }

        const isMatch = bcrypt.compareSync(password, user.password);

        if (!isMatch) {
            return res.status(403).send({ err: 'incorrect credentials' })
        }

        res.send(user);
    } catch (error) {
        res.status(500).send({ err: error.message })
    }
})

r.get('/profile/:userId', async (req, res) => {
    try {
        const id = req.params.userId;
        const user = await User.findById(id).select('-password')
        if (!user) {
            return res.status(404).send({ err: "user not exists" })
        }

        res.send(user)
    } catch (error) {
        res.status(500).send({ err: error.message })
    }
})

r.post('/sendSms', smsValidations, (req, res) => {

    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.send({ errors: result.array() });
    }

    const client = twilio(accountSid, authToken, { accountSid })

    const { message, to } = req.body

    client.messages
        .create({
            from: "+16164992518",
            body: message,
            to: "+91" + to,
        })
        .then(message => {
            console.log(message.sid)
            res.send({ data: message })
        })
        .catch(err => {
            console.log(err)
            res.status(500).send({ err: err.message })
        });
})

module.exports = r