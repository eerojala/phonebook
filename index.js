const express = require('express')
const app = express()
const apiPersons = '/api/persons'

let persons = [
    {
        name: 'Arto Hellas',
        number: '040-12356',
        id: 1
    },
    {
        name: 'Martti Tienari',
        number: '040-123456',
        id: 2
    },
    {
        name: 'Arto Järvinen',
        number: '040-123456',
        id: 3
    },
    {
        name: 'Lea Kutvonen',
        number: '040-123456',
        id: 4
    }
]

app.get(`${apiPersons}`, (req, res) => {
    res.json(persons)
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
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete(`${apiPersons}/:id`, (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})