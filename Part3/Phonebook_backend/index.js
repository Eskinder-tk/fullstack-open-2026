require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()

app.use(express.static('dist'))

app.use(express.json())

morgan.token('body' , (req) => JSON.stringify(req.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));


app.get('/api/persons' , (request , response, next) => {
    Person.find({}).then(person => {
        response.json(person)
    })
          .catch(error => next(error))
})

app.get('/api/persons/:id' , (request , response, next) => {
    Person.findById(request.params.id)
          .then(person => {
            response.json(person)
    })
          .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number  } = request.body

  Person.findById(request.params.id)
    .then(person => {
      if (!person) {
        return response.status(404).end()
      }

      person.name = name
      person.number = number

      return person.save().then((updatedPerson) => {
        response.json(updatedPerson)
      })
    })
    .catch(error => next(error))
})

app.post('/api/persons' , (request , response , next) => {
    const { name , number } = request.body
    
    if (!name) {
        return response.status(400).json({ 
        error: 'Name is required!' 
    })
    }
     else if (!number) { 
        return response.status(400).json({ 
         error: 'Number is required!' 
    }) }

    const person = new Person({
        name : name ,
        number : number
    })
    person.save().then(person => response.json(person))
})

app.get('/info', (request, response) => {
  Person.countDocuments({})
    .then(total => {
      const date = new Date()
      response.send(`<p>Phonebook has info for ${total} people.</p> <p>${date}</p>`)
    })
    .catch(error => {
      console.error(error)
      response.status(500).send({ error: 'Database query failed' })
    })
})

app.delete('/api/persons/:id', (request , response, next) => {
    Person.findByIdAndDelete(request.params.id)
          .then(result => {
            response.json(204).end()
     })
          .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})