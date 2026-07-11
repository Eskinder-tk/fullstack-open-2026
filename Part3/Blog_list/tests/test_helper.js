const Blog = require('../models/blog')

const initialBloges = [
  {
  "title": "Da Great Wall of China",
  "author": "Ekndl",
  "url": "cccccccccc",
  "likes": 69,
},
  {
  "title": "AXUM",
  "author": "Ekndnrias",
  "url": "aaaaaaaaaa",
  "likes": 999,
}
]

/*const nonExistingId = async () => {
  const note = new Note({ content: 'willremovethissoon' })
  await note.save()
  await note.deleteOne()

  return note._id.toString()
}*/

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBloges, blogsInDb
}