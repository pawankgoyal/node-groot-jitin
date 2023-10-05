const express = require('express');
const app = express();
const port = 1400;
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017')
    .then(() => console.log("db connected"))
    .catch((err) => console.log(err))

app.get('/', (req, res) => {
    res.send('hello')
})

app.listen(port, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`listning on http://localhost:${port}`)
    }
})