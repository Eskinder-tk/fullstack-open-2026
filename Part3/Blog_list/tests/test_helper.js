const Blog = require('../models/blog')
const User = require('../models/user')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)

const initialBloges = [
  {
  "title": "Da Great Wall of China",
  "author": "Ekndl",
  "url": "cccccccccc",
  "likes": 69
},
  {
  "title": "AXUM",
  "author": "Ekndnrias",
  "url": "aaaaaaaaaa",
  "likes": 999
}
]



/*const nonExistingId = async () => {
  const note = new Note({ content: 'willremovethissoon' })
  await note.save()
  await note.deleteOne()

  return note._id.toString()
}*/

const token = async () => {
  const userLogged = {
        "username": "root",
        "password": "salainen"
      }
    const response = await api
                        .post('/api/login')
                        .send(userLogged)
    return response.body.token
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBloges, blogsInDb, usersInDb, token
}