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
    const result = await Student.find()
    // const result = await Student.find().where("age").gte(20)
    // const result = await Student.find().where("age").lte(20)
    // const result = await Student.find()
    //      .where("age").lte(20)
    //      .where("name").equals("John Doe")

    // const result = await Student.find()
    //     .where("age").lte(20)
    //     .where("name").regex("e")

    // const result = await Student.find()
    //     .where("courses").size(1)

    // const result = await Student.find()
    //     .or([{ name: "John Doe" }, { age: 22 }]).select("email -_id")

    // const result = await Student.find()
    //     .where('age').gt(22).countDocuments();

    // const result = await Student.find().where("clientId").exists()

    // const query = Student.find().exists("clientId", false)
    // let result = await query.countDocuments()

    // const result = await Student.find().sort({ "age": 1 }).limit(5)

    // const result = await Student.find().sort({ "age": 1 }).lean()
    // delete result[0].name

    // const result = await Student.find().sort({ "age": 1 }).skip(7).limit(100)

    // const result = await Student.find().sort({ "age": 1 }).where("name").in(["Eva White", "John Doe"])
    // const result = await Student.find().sort({ "age": 1 }).where("name").in([new RegExp("ev", "i"), "John Doe"])
    // const result = await Student.find().sort({ "age": 1 }).where("name").in([/ev/i, "John Doe"])


    // -----------------------------------------------------------
    // if nested keys are present

    // {
    //     "_id": "657b18952975e503710e3cfb",
    //     "name": "Eva White",
    //     address: {
    //          city: "jaipur",
    //          street: "124"
    //     }
    //     "__v": 0
    // }

    // const result = await Student.find().where("address.city").equals('jaipur')
    // ----------------------------------------------------------

    res.json({ result })
})

app.get('/students/jsonQuery', async (req, res) => {
    // const result = await Student.find({
    //     age: {
    //         $gt: 20
    //     }
    // })

    // const result = await Student.find({
    //     age: {
    //         $lt: 21,
    //         $gt: 19
    //     },
    // })

    // const result = await Student.find({
    //     age: {
    //         $lt: 21,
    //     },
    //     name: "John Doe"
    // })

    // const result = await Student.find({
    //     age: {
    //         $lt: 21,
    //     },
    //     name: /Ev/
    // })

    // get data which contains courses with size of lt 2 AND gt 0
    // const result = await Student.find({
    //     $and: [
    //         {
    //             $expr: { $lt: [{ $size: "$courses" }, 2] }
    //         },
    //         {
    //             $expr: { $gt: [{ $size: "$courses" }, 0] }
    //         }
    //     ]
    // })

    // const result = await Student.find({
    //     courses: { $in: ['Mathematics'] }
    // })

    // const result = await Student.find({
    //     courses: { $elemMatch: { $eq: 'Mathematics' } }
    // })

    // const result = await Student.find({
    //     name: { $in: ["Eva White", "John Doe"] }
    // })

    // const result = await Student.find({ age: 21 }).limit(2)

    const result = await Student.find({
        // TODO
        "address.city": "jaipur",
        // TODO
        address: {
            city: "jaipur"
        }
    })

    res.send({ result })
})

app.listen(1400, () => {
    console.log("server is listning on http://localhost:1400")
})
