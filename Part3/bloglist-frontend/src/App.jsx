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



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newMessage , setNewMessage] = useState(null)
  const [error , setError] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


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

  const noteFormRef = useRef()

  const addBlog = (blogObject) => {

    blogService.create(blogObject).then(returnedBlogs => {
      returnedBlogs.user = user
      noteFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(returnedBlogs))

      setNewMessage(`A new blog ${blogObject.title} by ${blogObject.author} have been added`)
      setTimeout(() => {
        setNewMessage(null)
      }, 5000)
    })
  }
  const deleteBlog = (blog) => {
    console.log(blog.id)


    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogService.remove(blog.id).then( () => {
        const filteredBlogs = blogs.filter(b => b.id !== blog.id)
        setBlogs(filteredBlogs)
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

  return (
    <div>
      <h2>blogs</h2>
      <Error error = {error} />

      <Notify message = {newMessage} />
      {!user && <LoginForm handleLogin={handleLogin}
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}/>
      }

      {user && (
        <div>
          <div>
            <p>{user.name} logged in <button onClick={logUserOut}>log out</button></p>
          </div>
          {blogForm()}
          {sortedBlogs.map(blog =>
            <Blog key={blog.id} blog={blog} updateBlog={handleLikes} user={user} deleteBlog={deleteBlog}/> )}
          <button onClick={logUserOut}>log out</button>

        </div>
      )}
    </div>
  )
}

export default App