const express = require('express');
const app = express();

const PORT = 1200;
app.use(express.json())

let products = [
    {
        id: 1,
        title: 'shoes',
        price: 1200
    },
    {
        id: 2,
        title: 'shoes',
        price: 120
    },
    {
        id: 3,
        title: 'shirt',
        price: 450
    }
]

app.get('/product', (req, res) => {
    res.send(products)
});

app.post('/product', (req, res) => {
    console.log(req.body)
    products.push(req.body)
    res.send(products)
})

app.delete('/product/:id', (req, res) => {
    const id = req.params.id
    // products.map((e, i) => {
    //     if (e.id == req.params.id) {
    //         products.splice(i, 1);
    //     }
    // })

    const index = products.findIndex(e => e.id == id);

    if (index == -1) {
        return res.send({ message: 'product does not exist' })
    }
    products.splice(index, 1);
    res.send(products);
})


app.listen(PORT, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('server is listning on http://localhost:' + PORT)
    }
})