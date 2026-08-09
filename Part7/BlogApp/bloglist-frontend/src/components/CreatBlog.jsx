import { useNavigate } from 'react-router-dom'
import { useBlogs } from '../hooks/useBlogs'
import useNotificationStore from '../hooks/useNotification'
import { TextField , Button  , Box} from '@mui/material'
import useField from '../hooks/useField'
import { useCredentials } from '../hooks/useLogin'

const CreatBlog = () => {

  const {setNewMessage , setError} = useNotificationStore()
  const {user} = useCredentials()

  const {addBlog} = useBlogs()

  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  const navigate = useNavigate()

  const addBlogs = async (event) => {
    event.preventDefault()
    if (user) {
      await addBlog({
      title : title.props.value,
      author : author.props.value,
      url : url.props.value
    })
    navigate('/')
    setNewMessage(
        `A new blog ${title.props.value} by ${author.props.value} have been added`
      );
      setTimeout(() => {
        setNewMessage(null);
      }, 5000);
    title.reset
    author.reset
    url.reset
    } else {
      navigate('/login')
      setError('You have to login to add a blog.')
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addBlogs}>
        <Box
            sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off"
         >
          <div>
            <TextField id="title" label="Title" variant="filled" {...title.props}/>
          </div>
          <div>
            <TextField id="author" label="Author" variant="filled" {...author.props}/>
          </div>

          <div>
            <TextField id="url" label="URL" variant="filled" {...url.props}/>
          </div>
        </Box>
        <div>
          <Button type="submit" variant="contained" style={{ marginTop: 10 }}>create</Button>
        </div>
      </form>
    </div>
  )}
export default CreatBlog