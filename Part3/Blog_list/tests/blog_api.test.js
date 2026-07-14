const {test , after , beforeEach , describe} = require('node:test')
const assert = require('assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const User = require('../models/user')
const app = require('../app')
const blog = require('../models/blog')
const helper = require('./test_helper')
const { tokenExtractor, userExtractor } = require('../utils/middleware')
const bcrypt = require('bcrypt')


const api = supertest(app)
app.use(tokenExtractor)

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('salainen', 10)
  const user = new User({ username: 'root', passwordHash })
  const savedUser = await user.save()

  const blogsWithUser = helper.initialBloges.map(blog => ({
    ...blog,
    user: savedUser._id 
  }))

  await Blog.insertMany(blogsWithUser)
})

describe('when there is initially some blogs saved', () => {
    test('All blogs are returned' , async () => {
        const response = await api.get('/api/blogs')

        assert.strictEqual(response.body.length , helper.initialBloges.length)
})

    test('All blogs have a property named id' , async () => {
        const response = await api.get('/api/blogs')
        const ids = response.body.map(e => e.id)
        assert.strictEqual(response.body.length , ids.length)
})
})



test('a valid blog can be added' , async () => {
    const newBlog = {
                    "title": "ISTANBUL",
                    "author": "Ekndnrias",
                    "url": "iiiiiiiiii",
                    "likes": 878
                    }
    const token = await helper.token()
    
    const res = await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization' , `Bearer ${token}`)
        .set('Accept', 'application/json');
        
    assert.strictEqual(res.statusCode , 201)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length , helper.initialBloges.length + 1)

    const contents = blogsAtEnd.map(e => e.title)
    assert(contents.includes(newBlog.title))
})

test('if the likes property is missing it will default the value to 0' , async () => {
    const newBlog = {
                    "title": "ISTANBUL",
                    "author": "Ekndnrias",
                    "url": "iiiiiiiiii"
                    }

    const token = await helper.token()
    
    const res = await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization' , `Bearer ${token}`)
        .set('Accept', 'application/json');

    assert.strictEqual(res.statusCode , 201)

    const blogsAtEnd = await helper.blogsInDb()
    
    const contents = blogsAtEnd.map(e => e.likes)
    assert(contents.includes(0))
})

test('if a url or a title is missing it will respond with status 400 bad request' , async () => {
     const newBlog = {
                        "title": "America",
                        "author": "json mamoa",
                         "likes": 11
                     }

    const token = await helper.token()
    
    const res = await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization' , `Bearer ${token}`)
        .set('Accept', 'application/json');

    assert.strictEqual(res.statusCode , 400)
        
    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length , helper.initialBloges.length)

})

test('a blog can be deleted using the id property' , async () => {
    const blogAtStart = await helper.blogsInDb()
    const id = blogAtStart[0].id

    const token = await helper.token()
    
    const res = await api
        .delete(`/api/blogs/${id}`)
        .set('Authorization' , `Bearer ${token}`)

    assert.strictEqual(res.statusCode , 204)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length , helper.initialBloges.length - 1)

    const ids = blogsAtEnd.map(e => e.id)
    assert(!ids.includes(id))

})

test('a blog can be updated with a valid id' , async () => {
    const uBlog = {
                        "title": "America",
                         "likes": 11
                     }
    const blogAtStart = await helper.blogsInDb()
    const id = blogAtStart[0].id

    await api
        .put(`/api/blogs/${id}`)
        .send(uBlog)
        .expect(200)
        .expect('Content-Type' , /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const likes = blogsAtEnd.map(e => e.likes)
    const title = blogsAtEnd.map(e => e.title)
    assert(likes.includes(uBlog.likes))
    assert(title.includes(uBlog.title))

})

test('Creation will fail if a token is not provided' , async () => {
    const newBlog = {
                    "title": "ISTANBUL",
                    "author": "Ekndnrias",
                    "url": "iiiiiiiiii",
                    "likes": 878
                    }
    
    const res = await api
        .post('/api/blogs')
        .send(newBlog)
        
    assert.strictEqual(res.statusCode , 401)
})

after (async () => {
    await mongoose.connection.close()
})