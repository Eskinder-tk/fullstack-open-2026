import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { TextField , Button  , Box} from '@mui/material'

const CreatBlog = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const navigate = useNavigate()

  const addBlog = event => {
    event.preventDefault()
    createBlog({
      title : title,
      author : author,
      url : url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
    navigate('/')
  }

  return (
    <div>
      <h2>Create new</h2>

      <form onSubmit={addBlog}>


        <Box
            component="form"
            sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off"
         >
          <div>
            <TextField id="title" label="Title" variant="filled" type='text'
              value={title}
              onChange={({ target }) => setTitle(target.value)}/>
          </div>
          <div>
            <TextField id="author" label="Author" variant="filled" type='text'
              value={author}
              onChange={({ target }) => setAuthor(target.value)}/>
          </div>

          <div>
            <TextField id="url" label="URL" variant="filled" type='text'
              value={url}
              onChange={({ target }) => setUrl(target.value)}/>
          </div>
      
        </Box>

        <div>
          <Button type="submit" variant="contained" style={{ marginTop: 10 }}>create</Button>
        </div>

      </form>
    </div>
  )}
export default CreatBlog