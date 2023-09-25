const express = require('express');
const app = express();

const PORT = 1200;
app.use(express.json());

let products = [
    {
        title: 'shoes',
        price: 1200
    },
    {
        title: 'shirt',
        price: 450
    }
]

app.get('/product', (req, res) => {
    res.send(products)
});

app.post('/product', (req, res) => {
    // console.log(req.body)
    products.push(req.body)
    res.send(products)
})

app.listen(PORT, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('server is listning on http://localhost:' + PORT)
    }
})