const express = require('express');
const connectDb = require('./dbConnect');
const User = require('./models/User')
const bcrypt = require('bcrypt');
const { validationResult, body } = require('express-validator');

connectDb()
const app = express()
app.use(express.json())
const PORT = 1500;

const registerValidations = [
    body('name', "Name must be have 2 chars").isLength({ min: 2 }),
    body('email', "Invalid email").isEmail(),
    body('password', "password must be strong").isStrongPassword(),
]

const loginValidations = [
    body('email', "Invalid email").isEmail(),
    body('password', "password must be strong").notEmpty(),
]

app.post('/register', registerValidations, async (req, res) => {
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

app.post('/login', loginValidations, async (req, res) => {

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

app.get('/profile/:userId', async (req, res) => {
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

app.listen(PORT, (err) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log("server listning on http://locahost:" + PORT);
    }
})