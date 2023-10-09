const express = require('express');
const app = express();
const port = 1400;
const mongoose = require('mongoose');
const product = require('./product');
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/groot-node?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.0.1')
    .then(() => console.log("db connected"))
    .catch((err) => console.log(err))

app.post('/', async (req, res) => {
    console.log(req.body)
    product.create(req.body)
        .catch(err => console.log(err))

    res.send("done")
})

app.get('/', async (req, res) => {
    let data = await product.find({})
    res.send(data)
})

app.delete('/:id', async (req, res) => {
    await product.findByIdAndDelete(req.params.id)
    res.send('done')
})

app.listen(port, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`listning on http://localhost:${port}`)
    }
})