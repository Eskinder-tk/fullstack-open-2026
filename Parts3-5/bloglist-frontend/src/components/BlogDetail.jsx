import { useState } from 'react'
import {
  Routes, Route, Link, useMatch
} from 'react-router-dom'
import blogService from '../services/blogs'
import { useNavigate } from 'react-router-dom'

import { TextField , Button  , Box , Card , CardActions , CardContent , Typography , Stack } from '@mui/material'
import { red } from '@mui/material/colors'


const BlogDetail = ({ blog , blogs , updateBlog , user , setBlogs , setNewMessage }) => {

  const [show , setShow] = useState(false)
  const navigate = useNavigate()

  if(!blog) {
    return <div>wait a sec..</div>
  }

  const deleteBlog = (blog) => {
      console.log(blog.id)
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        blogService.remove(blog.id).then( () => {
          const filteredBlogs = blogs.filter(b => b.id !== blog.id)
          setBlogs(filteredBlogs)
          navigate('/')
          setNewMessage(`Successfully removed blog ${blog.title} by ${blog.author}`)
          setTimeout(() => {
            setNewMessage(null)
          }, 5000)
        })
      }
      else {
        setBlogs(blogs)
      }
  
    }

const verifyUser = blog.user?.username === user?.username

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

  const userId = typeof blog.user === 'object' && blog.user !== null ? blog.user.id || blog.user._id : blog.user

  const handleBlogUpdate = (event , blog) => {
    event.preventDefault()
    updateBlog(blog.id,{
      title : blog.title,
      user : userId,
      url : blog.url,
      author : blog.author,
      likes : blog.likes,
      id : blog.id
    })
  }

  const handleDelete = (event , blog) => {
    event.preventDefault()
    deleteBlog(blog)
  }

  return (
    <div className='titleAuthor'>

      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          
          <Typography variant="h5" component="div">
            <b>{blog.title}</b>
          </Typography>
          <div>
            <Typography variant="h6" sx={{ color: 'text.secondary', mb: 1.5 , marginTop : 1.5  }} >By {blog.author}</Typography>
          </div>
          <div className='url'>
            <a href="">{blog.url}</a>
          </div>
          <div>
            <Typography className='author' sx={{ color: 'text.secondary', mb: 1.5 , marginTop : 1.5  }} >Added by {blog.user.name}</Typography>
          </div>
          <Stack spacing={2} direction="row" sx={{marginTop : 1.5}}>
            <div className='like'>
              {blog.likes} likes <Button type="submit" variant="outlined" onClick={(event) => handleBlogUpdate(event, blog)} className='likeButt' >like</Button>
            </div>
            <div>
              <Button type="submit" variant="outlined"  color='error' style={showVerified} className='deleteButton' onClick={(event) => handleDelete(event, blog)}>Delete</Button>
            </div>
          </Stack>
        </CardContent>
      </Card>
        
    </div>


  )}

export default BlogDetail