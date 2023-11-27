const express = require('express')
const app = express()
const multer = require('multer')
const path = require('path')

app.use(express.json())

let upload = multer({
    storage: multer.diskStorage({
        filename: function (req, file, cb) {
            const fileName = path.parse(file.originalname).name + Date.now() + path.extname(file.originalname);
            cb(null, fileName);
        },
        destination: 'files'
    }),
}).single("myFile")

app.post('/', upload, (req, res) => {
    // console.log(req.file)
    console.log(req.body)
    res.send("this is ok")
})

app.listen(1400, () => {
    console.log("server is listning on http://localhost:1400")
})