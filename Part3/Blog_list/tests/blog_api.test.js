const {test , after , beforeEach , describe} = require('node:test')
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

describe('when there is initially some notes saved', () => {
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
    assert(contents.includes(newBlog.title))
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
                        "author": "json mamoa",
                         "likes": 11
                     }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
        
    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length , helper.initialBloges.length)

})

test('a blog can be deleted using the id property' , async () => {
    const blogAtStart = await helper.blogsInDb()
    const id = blogAtStart[0].id
    await api
        .delete(`/api/blogs/${id}`)
        .expect(204)

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

after (async () => {
    await mongoose.connection.close()
})