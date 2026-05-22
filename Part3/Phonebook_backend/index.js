require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()

app.use(express.json())

app.use(express.static('dist'))

morgan.token('body' , (req) => JSON.stringify(req.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));


let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons' , (request , response) => {
    Person.find({}).then(person => {
        response.json(person)
    })
})

app.get('/api/persons/:id' , (request , response) => {
    const id = request.params.id
    const target = persons.find(n => n.id === id)
    if (target) {
        response.json(target)
    } else {
        response.status(404).end()
    }
})

app.post('/api/persons' , (request , response) => {
    const id = Math.round(Math.random() * 10000)
    const body = request.body
    
    if (!body.name) {
        return response.status(400).json({ 
        error: 'Name is required!' 
    })
    }
     else if (!body.number) { 
        return response.status(400).json({ 
         error: 'Number is required!' 
    }) }

    const person = new Person({
        name : body.name ,
        number : body.number
    })
    person.save().then(person => response.json(person))
})

app.get('/info' , (request , response) => {
    const total = persons.length
    const date = Date()
    response.send(`<p>Phonebook has info for ${total} people.</p> <p>${date}</p>`)
})

app.delete('/api/persons/:id', (request , response) => {
    const id = Number(request.params.id)
    persons = persons.filter(n => n.id !== id)
    response.status(204).end()
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})