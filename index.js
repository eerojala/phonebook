const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const apiPersons = '/api/persons'


app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('build'))

const generateId = () => {
    return Math.floor((Math.random() * 10000) + 1)
}

const formatPerson = (person) => {
    return {
        name: person.name,
        number: person.number,
        id: person.id
    }
}

app.get(`${apiPersons}`, (req, res) => {
    Person
        .find({}, {__v: 0})
        .then(persons => {
            res.json(persons.map(formatPerson))
        })
})

app.get ('/info', (req, res) => {
    const date = new Date()
    res.send(
        `
        <p>Puhelinluettelossa ${persons.length} henkilön tiedot</p>
        <p>${date}</p>
        `
    )
})

app.get(`${apiPersons}/:id`, (req, res) => {
    Person
        .findById(req.params.id)
        .then(person => {
            res.json(formatPerson(person))
        })
})

app.delete(`${apiPersons}/:id`, (req, res) => {
    console.log('DELETE')
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

app.post(`${apiPersons}`, (req, res) => {
    const body = req.body
    console.log(body)
    
    if (!body.name || !body.number ) {
        return res.status(400).json({error: 'Missing vital parameters'})
    } // else if (persons.find(person => person.name === body.name)) {
    //    return res.status(400).json({error: 'Name must be unique'})
    // } 
    

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person
        .save()
        .then(savedPerson => {
            res.json(formatPerson(savedPerson))
        })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})