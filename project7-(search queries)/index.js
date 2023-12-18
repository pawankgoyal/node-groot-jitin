require('./db')
const express = require('express')
const { Student } = require('./model/Student')
const { students } = require('./data/students')
const app = express()

app.get('/', function (req, res) {
    res.send({ message: "This is ok." })
})

app.get('/addStudents', (req, res) => {

    students.forEach((student) => {
        Student.create(student)
    })

    res.send("data inserted")
})

app.get('/students', async (req, res) => {
    // const result = await Student.find()
    // const result = await Student.find().where("age").gte(20)
    // const result = await Student.find().where("age").lte(20)
    // const result = await Student.find().where("age").lte(20).where("name").equals("John Doe")

    // const result = await Student.find()
    //     .where("age").lte(20)
    //     .where("name").regex("")

    // const result = await Student.find()
    //     .where("courses").size(1)

    // const result = await Student.find()
    //     .or([{ name: "John Doe" }, { age: 22 }]).select("email -_id")

    // const result = await Student.find()
    //     .where('age').gt(22).countDocuments();

    res.json({ result })
})

app.listen(1400, () => {
    console.log("server is listning on http://localhost:1400")
})