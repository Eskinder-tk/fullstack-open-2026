import { useState } from 'react'

const Blog = ({ blog , updateBlog , user , deleteBlog }) => {

  const [show , setShow] = useState(false)

  const verifyUser = blog.user.username === user.username ? true : false

  const showWhenVisible = { display: show ? '' : 'none' }

  const showVerified = { display: verifyUser ? '' : 'none' }

  const toggleDetail = () => {
    setShow(!show)
  }
  const buttonLabel = show === false ? 'view' : 'hide'

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleBlogUpdate = (event , blog) => {
    event.preventDefault()
    updateBlog(blog.id,{
      title : blog.title,
      user : blog.user.id,
      url : blog.url,
      author : blog.author,
      likes : blog.likes,
      id : blog.id
    })
  }

  const handleDelete = (event , blog) => {
    deleteBlog(blog)
  }


  return (
    <div style={blogStyle}>
      <div >
        {blog.title}
        <button onClick={toggleDetail} >{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        <div>
          {blog.url}
        </div>
        <div>
          {blog.likes} <button onClick={(event) => handleBlogUpdate(event, blog)}>like</button>
        </div>
        <div>
          {blog.author}
        </div>
        <button style={showVerified} onClick={(event) => handleDelete(event, blog)}>Delete</button>

      </div>
    </div>


  )}

export default Blog