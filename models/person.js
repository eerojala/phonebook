const mongoose = require('mongoose')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const dbUrl = process.env.MONGODB_URI

mongoose.connect(dbUrl)

const Person = mongoose.model('Person', {
    name: String,
    number: String
})

module.exports = Person