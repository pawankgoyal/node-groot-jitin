const express = require('express');
const app = express();
const port = 1400;
const mongoose = require('mongoose');
const product = require('./product');

mongoose.connect('mongodb://localhost:27017/groot-node')
    .then(() => console.log("db connected"))
    .catch((err) => console.log(err))

app.get('/', async (req, res) => {
    product.create({
        title: "shoes",
        price: 12
    })
    res.send("done")
})

app.listen(port, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`listning on http://localhost:${port}`)
    }
})