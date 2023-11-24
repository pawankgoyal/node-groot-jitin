const express = require('express')
const app = express()
const port = 3000
require('./db')

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/auth', require('./routes/user'))
app.use('/note', require('./routes/note'))


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})