import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import LoginForm from './components/LoginForm'
import CreatBlog from './components/CreatBlog'
import Notify from './components/Notify'
import Error from './components/Error'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newMessage , setNewMessage] = useState(null)
  const [error , setError] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const addBlog = event => {
    event.preventDefault()
    const blogObject = {
      title : title,
      author : author,
      url : url
    }

    blogService.create(blogObject).then(returnedBlogs => {
      setBlogs(blogs.concat(returnedBlogs))
      setTitle('')
      setAuthor('')
      setUrl('')
      setNewMessage(`A new blog ${blogObject.title} by ${blogObject.author} have been added`)
      setTimeout(() => {
            setNewMessage(null) 
          }, 5000)
    })
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

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

  return (
    <div>
      <h2>blogs</h2>
      <Error error = {error} />

      <Notify message = {newMessage} />
      {!user && <LoginForm handleLogin={handleLogin} username={username} password={password} setUsername={setUsername} setPassword={setPassword}/>}
      

      {user && (
        <div>
          <div>
            <p>{user.name} logged in <button onClick={logUserOut}>log out</button></p>
          </div>
          <CreatBlog title={title} setTitle={setTitle} author={author} setAuthor={setAuthor} url={url} setUrl={setUrl} addBlog={addBlog}/>
          {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} /> )}
          <button onClick={logUserOut}>log out</button>
          
        </div>
    )}
    </div>
  )
}

export default App