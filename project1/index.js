const express = require('express');
const app = express()
const cors = require('cors')

app.use(cors());
app.get('/suresh', (req, res) => {
    console.log("first")
    res.send({
        message: 'this is hello API. Node class.this is hello API. Node class.this is hello API. Node class.this is hello API. Node class.this is hello API. Node class.this is hello API. Node class.this is hello API. Node class.this is hello API. Node class.this is hello API. Node class.this is hello API. Node class.this is hello API. Node class.this is hello API. Node class.this is hello API. Node class.this is hello API. Node class.this is hello API. Node class.this is hello API. Node class.this is hello API. Node class.this is hello API. Node class.this is hello API. Node class.this is hello API. Node class.this is hello API. Node class.this is hello API. Node class.this is hello API. Node class.this is hello API. Node class.this is hello API. Node class.this is hello API. Node class.this is hello API. Node class.this is hello API. Node class.this is hello API. Node class.this is hello API. Node class.this is hello API. Node class.this is hello API. Node class.this is hello API. Node class.this is hello API. Node class.this is hello API. Node class.this is hello API. Node class.this is hello API. Node class.this is hello API. Node class.this is hello API. Node class.this is hello API. Node class.this is hello API. Node class.this is hello API. Node class.this is hello API. Node class.this is hello API. Node class.this is hello API. Node class.this is hello API. Node class.this is hello API. Node class.this is hello API. Node class.this is hello API. Node class.this is hello API. Node class.this is hello API. Node class.this is hello API. Node class.this is hello API. Node class.this is hello API. Node class.this is hello API. Node class.this is hello API. Node class.this is hello API. Node class.this is hello API. Node class.this is hello API. Node class.this is hello API. Node class.'
    })
})

app.get('/demo1', (req, res) => {
    console.log(req.query)
    res.send("this is demo 1")
})

app.get('/demo2/:id', (req, res) => {
    console.log(req.params)
    res.send('this is demo 2')
})

// function abc() {
//     console.log("abc")
// }
// abc()

app.listen(1300, () => {
    console.log("server is running on port 1300")
})
