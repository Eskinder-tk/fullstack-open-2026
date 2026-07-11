const blogsRouter = require('express').Router()
const { request, response } = require('../app')
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

blogsRouter.delete('/:id' , async (request , response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  })

blogsRouter.put('/:id' , async (request , response) => {
  const { likes , title } = request.body

  const blog = await Blog.findById(request.params.id)
  if(!blog){
    return response.status(404).end()
  }

  blog.likes = likes
  blog.title = title || blog.title

  await blog.save()
  response.json(blog)

})

module.exports = blogsRouter