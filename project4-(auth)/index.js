const express = require('express');
const connectDb = require('./dbConnect');
const dotenv = require('dotenv')
dotenv.config()

connectDb()

const app = express()
app.use(express.json())

const PORT = 1500;

app.use('/', require('./routes/auth'))

app.listen(PORT, (err) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log("server listning on http://locahost:" + PORT);
    }
})