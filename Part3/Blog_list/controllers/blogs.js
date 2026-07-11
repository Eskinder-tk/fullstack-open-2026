const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

blogsRouter.post('/', (request, response) => {
  const res = request.body
  if (res.url == undefined || res.title == undefined){
    response.status(400).json("url or title property missing!")
  }
  else {
    const blog = new Blog(request.body)

    blog.save().then((result) => {
      response.status(201).json(result)
    })
  }
  
})

module.exports = blogsRouter