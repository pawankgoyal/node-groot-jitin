const express = require('express');
const connectDb = require('./dbConnect');
const User = require('./models/User')
const bcrypt = require('bcrypt')

connectDb()
const app = express()
app.use(express.json())
const PORT = 1500;


app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name) {
            return res.send({ err: "name is required" })
        } else if (!email) {
            return res.send({ err: "email is required" })
        } else if (!password) {
            return res.send({ err: "password is required" })
        }

        const user = await User.findOne({ email: req.body.email });

        const salt = bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashSync(password, salt)

        req.body.password = hashPassword;

        // null, undefined , 0 => false
        if (user) {
            return res.send({ err: "user already exists" })
        }

        let response = await User.create(req.body)
        res.send(response)
    } catch (error) {
        res.send({ err: error })
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