const { validationResult } = require("express-validator");
const twilio = require('twilio');
const User = require('../models/User')
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')

// Credentials to send sms to mobile with twillio, find on twillio dashboard.
const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;

// Controller to register a new user.
const registerController = async (req, res) => {

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

}

// Controller to login an existing user.
const loginController = async (req, res) => {

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

        let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
        await User.findByIdAndUpdate(user._id, { token })

        res.send({ token });
    } catch (error) {
        res.status(500).send({ err: error.message })
    }
}

// Get user profile with id.
const getProfileController = async (req, res) => {
    try {

        const { id } = req.user

        const user = await User.findById(id).select(['-password', '-token'])

        res.send({ data: user })

    } catch (error) {
        res.status(500).send({ err: error.message })
    }
}

// Send sms to mobile.
const sendSmsController = (req, res) => {

    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.send({ errors: result.array() });
    }

    const client = twilio(accountSid, authToken, { accountSid })

    const { message, to } = req.body

    client.messages
        .create({
            // Get mobile number from twillio dashboard
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
}

// Send email.
const emailController = async (req, res) => {

    try {

        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.send({ errors: result.array() });
        }

        const { from, to, content, subject } = req.body;
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD
            }
        });

        const info = await transporter.sendMail({
            from,
            to: to.join(','),
            subject,
            text: content
        })

        res.send({ data: info })
    } catch (error) {
        res.status(500).send({ err: error.message })
    }

}

const logoutController = async (req, res) => {

    try {

        const { token } = req.headers

        if (!token) {
            return res.status(403).send({ err: "unauthorised" })
        }

        // Token data
        let result;

        try {
            result = jwt.verify(token, process.env.JWT_SECRET)
        } catch (error) {
            return res.status(403).send({ err: "unauthorised" })
        }

        const { _id: id } = result;
        const user = await User.findById(id).select(['-password'])
        if (!user) {
            return res.status(404).send({ err: "user not exists" })
        }

        if (token !== user.token) {
            return res.status(403).send({ err: "unauthorised" })
        }

        await User.findByIdAndUpdate(id, { token: "" })

        res.send({ data: "Logged out successfully" })
    } catch (error) {
        res.status(500).send({ err: error.message })
    }
}

module.exports = { registerController, loginController, getProfileController, sendSmsController, emailController, logoutController }