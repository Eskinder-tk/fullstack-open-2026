import { useState } from 'react'
import {
  Routes, Route, Link, useMatch
} from 'react-router-dom'
import blogService from '../services/blogs'
import { useNavigate } from 'react-router-dom'

import { TextField , Button  , Box , Card , CardActions , CardContent , Typography , Stack } from '@mui/material'
import { red } from '@mui/material/colors'
import useNotificationStore from '../hooks/useNotification'
import { useBlogs } from '../hooks/useBlogs'
import { useCredentials } from '../hooks/useLogin'

const BlogDetail = () => {

  const {setNewMessage , setError} = useNotificationStore()
  const {deleteBlogMutate , handleLikes , blogs , addComment} = useBlogs()
  const {user} = useCredentials()

  const [show , setShow] = useState(false)
  const [comment , setComment] = useState('')
  const navigate = useNavigate()

  const match = useMatch("/blogs/:id");

  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null;

  if(!blog) {
    return <div>wait a sec..</div>
  }

  const deleteBlog = async (blog) => {
      if  (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        await deleteBlogMutate(blog.id)
        navigate('/')
        setNewMessage(`Successfully removed blog ${blog.title} by ${blog.author}`)
        setTimeout(() => {
          setNewMessage(null)
        }, 5000)
      }
      else {
        navigate('/')
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

  const handleBlogUpdate = async (event , blog) => {
    event.preventDefault()
    await handleLikes(blog.id,{
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

  const handleComment = async (event , blog) => {
    event.preventDefault()
    if (!comment.trim()) {
      setError("You can't add an empty comment.")
      setTimeout(() => {
        setError(null)
      }, 5000)
      return
    }
    await addComment(blog.id , comment)
    blog.comments = blog.comments.concat(comment)
    setComment('')
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
            
                <Typography className='author' sx={{ color: 'text.secondary', mb: 1.5 , marginTop : 1.5  }} >Added by <Link to={`/users/${blog.user.id}`}> {blog.user.name}</Link> </Typography>
            
          </div>
          <Stack spacing={2} direction="row" sx={{marginTop : 1.5}}>
            <div className='like'>
              {blog.likes} likes <Button type="submit" variant="outlined" onClick={(event) => handleBlogUpdate(event, blog)} className='likeButt' >like</Button>
            </div>
            <div>
              <Button type="submit" variant="outlined"  color='error' style={showVerified} className='deleteButton' onClick={(event) => handleDelete(event, blog)}>Delete</Button>
            </div>
          </Stack>
          <div>
              <h3>comments</h3>
            </div>

          <Box
          component="form"
          onSubmit={() => handleComment(event , blog)}
          sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField  id="outlined-size-small" size="small" placeholder='add a comment' value={comment} onChange={(e) => setComment(e.target.value)} /><Button sx={{m: 1.4}} variant="contained"  size="medium" type='submit' >ADD COMMENT</Button>   
            
            </div>
            </Box>

            <ul>
              {blog.comments.map(c => (
                <li key={c}>{c}</li>
              ))}
            </ul>
        </CardContent>
      </Card>
        
    </div>


  )}

export default BlogDetail