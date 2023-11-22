const fs = require('fs')

const content = 'this is a new file'

// fs.writeFileSync('jitin/kumar/sample.txt', content)

// let data = fs.readFileSync('index.html')
// console.log(data.toString())

// let arr = [...new Array(1000).keys()]

// fs.writeFileSync('sample.json', JSON.stringify(arr))

// fs.appendFileSync('sample.txt', "new york")
// console.log(arr)

// fs.unlinkSync('sample.txt')

// fs.mkdirSync('jitin')
// fs.rmdirSync('jitin')
let folderData = fs.readdirSync()
console.log(folderData)

// console.log(__dirname)