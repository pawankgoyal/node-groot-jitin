const mongoose = require("mongoose");
const url = 'mongodb://127.0.0.1:27017/groot-node?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.6'

const connectDb = () => {
    mongoose.connect(url)
        .then(() => console.log('mongodb conncted'))
        .catch(err => console.log(err))
}

module.exports = connectDb