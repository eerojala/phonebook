const mongoose = require('mongoose')

const dbUrl = 'mongodb://eerojala:kebabjohnson@ds225308.mlab.com:25308/phonebook_database'

mongoose.connect(dbUrl)

const Person = mongoose.model('Person', {
    name: String,
    number: String
})

module.exports = Person