// console.log('a'.charCodeAt())

// for (let i = 0; i < 1000; i++) {
//     console.log(i, String.fromCharCode(i))
// }

const buffer = Buffer.from(`asbcd abc`)

// console.log(buffer.toJSON())
// console.log(buffer)
buffer.write("jitin is a good boy")

const encoded = buffer.toString('base64')

const buffer1 = Buffer.from('aml0aW4gaXMg', 'base64')

console.log(buffer1.toString('utf-8'))