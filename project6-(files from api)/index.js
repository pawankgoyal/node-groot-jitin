const express = require('express')
const app = express()
const multer = require('multer')
const path = require('path')

app.use(express.json())

let upload = multer({
    fileFilter: function (req, file, cb) {
        try {
            if (file.mimetype === 'image/png') {
                cb(null, true)
            } else {
                cb(null, false)
            }
            console.log(file)
        } catch (error) {
            cb(new Error("this is file filter error"), null)
        }
    },
    storage: multer.diskStorage({
        filename: function (req, file, cb) {
            const fileName = path.parse(file.originalname).name + Date.now() + path.extname(file.originalname);
            cb(null, fileName);
        },
        destination: 'files'
    }),
}).single("myFile")

let uploadDest = multer({
    dest: "uploads/"
}).single("myFile")

let uploadMultiple = multer({
    storage: multer.diskStorage({

        filename: function (req, file, cb) {
            const fileName = path.parse(file.originalname).name + Date.now() + path.extname(file.originalname);
            cb(null, fileName);
        },
        destination: 'MultipleFiles'

    }),
    limits: {
        // 100 MB
        fileSize: 100 * 1024 * 1024
    }
}).array('myFile')

let uploadMultipleFileds = multer({
    storage: multer.diskStorage({

        filename: function (req, file, cb) {
            const fileName = path.parse(file.originalname).name + Date.now() + path.extname(file.originalname);
            cb(null, fileName);
        },
        destination: 'MultipleFiles'

    }),
    limits: {
        // 100 MB
        fileSize: 100 * 1024 * 1024
    }
}).fields([{ name: "profile", maxCount: 2 }, { name: "signature", maxCount: 1 }])

app.post('/single', uploadDest, (req, res) => {
    // console.log(req.file)
    console.log(req.body)
    res.send("this is ok")
})

app.post('/multiple', uploadMultiple, (req, res) => {
    // console.log(req.file)
    console.log(req.body)
    res.send("this is ok")
})

app.post('/errorHandling', (req, res) => {
    upload(req, res, function (error) {
        console.log(error)
    })
})

app.listen(1400, () => {
    console.log("server is listning on http://localhost:1400")
})