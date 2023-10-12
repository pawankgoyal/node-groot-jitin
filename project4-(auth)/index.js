const express = require('express');
const connectDb = require('./dbConnect');
const User = require('./models/User')
connectDb()
const app = express()
app.use(express.json())
const PORT = 1500;


app.post('/register', async (req, res) => {
    try {


        const user = await User.findOne({ email: req.body.email });
        console.log(user)
        // null, undefined , 0 => false
        if (user) {
            return res.send({ err: "user already exists" })
        }

        await User.create(req.body)
        res.send({ message: 'registered successfully' })
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