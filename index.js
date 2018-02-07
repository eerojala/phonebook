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
        .catch(error => {
            console.log(error)
            res.status(500).end()
        })
})

app.get ('/info', (req, res) => {
    Person
        .count({}, function (error, c) {
            const date = new Date()
            res.send(
                `
                <p>Puhelinluettelossa ${c} henkilön tiedot</p>
                <p>${date}</p>
                `
            )
        })
        .catch(error => {
            console.log(error)
            res.status(500).end()
        })
})

app.get(`${apiPersons}/:id`, (req, res) => {
    Person
        .findById(req.params.id)
        .then(person => {
            if (person) {
                res.json(formatPerson(person))
            } else {
                res.status(404).end()
            }
            
        })
        .catch(error => {
            console.log(error)
            res.status(400).end().send({error: 'Malformatted id'})
        })
})

app.delete(`${apiPersons}/:id`, (req, res) => {
    Person
        .findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => {
            res.status(400).send({ error: 'Malformatted id' })
        })
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

app.put(`${apiPersons}/:id`, (req, res) => {
    const body = req.body

    const person = {
        name: body.name,
        number: body.number
    }

    Person
        .findByIdAndUpdate(req.params.id, person, {new : true})
        .then(updatedPerson => {
            res.json(formatPerson(updatedPerson))
        })
        .catch(error => {
            console.log(error)
            res.status(400).send({ error: 'malformatted id '})
        })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})