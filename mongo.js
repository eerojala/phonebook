const mongoose = require('mongoose')

const url = 'mongodb://username:password@ds225308.mlab.com:25308/phonebook_database'

mongoose.connect(url)

const Person = mongoose.model('Person', {
    name: String,
    number: String
})

const name = process.argv[2]
const number = process.argv[3]

if (name && number) {
    const person = new Person({
        name: name,
        number: number
    })

    person
        .save()
        .then(response => {
            console.log('Person saved!')
            mongoose.connection.close()
        })
} else {
    console.log('Puhelinluettelo:')
    Person
        .find({})
        .then(result => {
            result.forEach(person => {
                console.log(person.name, ' ', person.number)
            })

            mongoose.connection.close()
        })
}