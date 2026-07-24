const blogsRouter = require('express').Router()
const { request, response } = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})



blogsRouter.post('/', userExtractor , async (request, response) => {
  const res = request.body;
  const user = request.user


  if (!user) {
    return response.status(400).json({ 
      error: 'No users exist in the database to associate this blog with' 
    });
  }

  if (res.url === undefined || res.title === undefined || res.author == undefined) {
    return response.status(400).json({ error: 'url, title or the author property can not be empty!' });
  } 
  
  const blog = new Blog({
    title: res.title,
    author: res.author,
    url: res.url,
    likes: res.likes,
    user: user._id || user.id
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  await savedBlog.populate('user', { username: 1, name: 1 });

  response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id' , userExtractor , async (request , response) => {

  const user = request.user

  
  const blog = await Blog.findById(request.params.id)
  const userId = user._id
  const blogPosterId = blog.user.toString()

  if (!(userId == blogPosterId)) {
    return response.status(400).json({ 
      error: 'No users exist in the database with this id' 
    });
  }

    await Blog.findByIdAndDelete(request.params.id)
    response.json(blog.id).status(204).end()
  })

blogsRouter.put('/:id' , async (request , response) => {
  const { likes , title } = request.body

  const blog = await Blog.findById(request.params.id)
  if(!blog){
    return response.status(404).end()
  }

  blog.likes = blog.likes + 1
  blog.title = title || blog.title

  await blog.save()
  response.json(blog)

})

module.exports = blogsRouter