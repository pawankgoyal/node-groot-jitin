const { default: mongoose } = require("mongoose");

const url = 'mongodb://127.0.0.1:27017/mongo-ref?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.6'

mongoose.connect(url).then(() => {
    console.log('db connected')
}).catch(err => {
    console.log(err)
})
