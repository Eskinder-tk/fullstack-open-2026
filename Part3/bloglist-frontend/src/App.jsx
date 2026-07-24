import { useState, useEffect , useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import LoginForm from './components/LoginForm'
import CreatBlog from './components/CreatBlog'
import Notify from './components/Notify'
import Error from './components/Error'
import Togglable from './components/Togglable'
import {
  Routes, Route, Link, useMatch
} from 'react-router-dom'
import { useParams, useNavigate } from 'react-router-dom'
import BlogDetail from './components/BlogDetail'
import { AppBar , Toolbar , Button , Typography} from '@mui/material'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newMessage , setNewMessage] = useState(null)
  const [error , setError] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const id = useParams().id
  const navigate = useNavigate()


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  //const noteFormRef = useRef()

  const addBlog = (blogObject) => {

    blogService.create(blogObject).then(returnedBlogs => {
      returnedBlogs.user = user
      //noteFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(returnedBlogs))

      setNewMessage(`A new blog ${blogObject.title} by ${blogObject.author} have been added`)
      setTimeout(() => {
        setNewMessage(null)
      }, 5000)
    })
  }
  

  const handleLikes = (id ,blogObject) => {
    blogService.update(id , blogObject).then((res) => {
      const updatedBlogs = blogs.map((x) => x.id === res.id ? { ...x, likes : res.likes } : x)
      setBlogs(updatedBlogs)
    })
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      navigate('/')
      setNewMessage(`${user.name} successfully logged in`)
      setTimeout(() => {
        setNewMessage(null)
      }, 5000)
    } catch {
      setError('wrong credentials')
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }
  const logUserOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setNewMessage('successfull logged out')
    setTimeout(() => {
      setNewMessage(null)
    }, 5000)
  }

  const blogForm = () => (
    <Togglable buttonLabel='Create new blog' ref={noteFormRef} >
      <CreatBlog createBlog={addBlog} />
    </Togglable>
  )

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  const padding = {
    padding: 5
  }

  const match = useMatch('/blogs/:id')

  const blg = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null

  console.log(blg)

  const style = { '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }
  const logOutStyle = { '&:hover': { bgcolor: 'rgba(226, 5, 5, 0.8)' } }
  const loginStyle = { '&:hover': { bgcolor: 'rgba(49, 192, 9, 0.8)' } }

  return (
    <div>


      <AppBar position="static">

        <Toolbar>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1, pl: 1 }}>
          Blog App
          </Typography>
          <Button color="inherit" component={Link} to="/" sx={style}>
          Blogs
          </Button>
          <Button color="inherit" component={Link} to="/create" sx={style}>
          New Blog
          </Button>

          {!user && <Button color="inherit" component={Link} to="/login" sx={loginStyle}> Login </Button>}

          {user && <Button onClick={logUserOut} color="inherit" sx={logOutStyle} >log out</Button>}
        </Toolbar>
      </AppBar>

      

      
      <Error error = {error} />

      <Notify message = {newMessage} />

      <Routes>
        <Route path='/blogs/:id' element = {
          <BlogDetail blog={blg} blogs={blogs} updateBlog={handleLikes} user={user}  setBlogs={setBlogs} setNewMessage={setNewMessage}/>
        } />

        <Route path='/create' element = {
          <CreatBlog createBlog={addBlog} />
        }/>

        <Route path='/' element={
          
          <li>
            <h2>Blogs</h2>
            {sortedBlogs.map(blog =>
            <Blog key={blog.id} blog={blog} updateBlog={handleLikes} user={user}/> )}
          </li>
        } />

        <Route path='/login' element={
          <LoginForm handleLogin={handleLogin}
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}/>
        } />

        

      

      </Routes>

      
    </div>
  )
}

export default App