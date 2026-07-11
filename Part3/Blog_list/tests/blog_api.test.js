const {test , after , beforeEach} = require('node:test')
const assert = require('assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const app = require('../app')
const blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)



beforeEach(async ()=> {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBloges)
})

test.only('All blogs are returned' , async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length , helper.initialBloges.length)
})

test.only('All blogs have a property named id' , async () => {
    const response = await api.get('/api/blogs')
    const ids = response.body.map(e => e.id)
    assert.strictEqual(response.body.length , ids.length)
})

test('a valid blog can be added' , async () => {
    const newBlog = {
                    "title": "ISTANBUL",
                    "author": "Ekndnrias",
                    "url": "iiiiiiiiii",
                    "likes": 878,
                    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type' , /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length , helper.initialBloges.length + 1)

    const contents = blogsAtEnd.map(e => e.title)
    assert(contents.includes('ISTANBUL'))
})

test('if the likes property is missing it will default the value to 0' , async () => {
    const newBlog = {
                    "title": "ISTANBUL",
                    "author": "Ekndnrias",
                    "url": "iiiiiiiiii"
                    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type' , /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    
    const contents = blogsAtEnd.map(e => e.likes)
    assert(contents.includes(0))
})

test('if a url or a title is missing it will respond with status 400 bad request' , async () => {
     const newBlog = {
                        "title": "America",
                        "author": "GIGA NIGGA",
                         "likes": 11
                     }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
        
    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length , helper.initialBloges.length)

})

after (async () => {
    await mongoose.connection.close()
})