import { TextField , Button  , Box} from '@mui/material'

const LoginForm = ({ handleLogin , setPassword , setUsername , password , username }) => (
  <form onSubmit={handleLogin}>
    <div>
      <h2>Log in to application</h2>
      <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <div>
         <TextField id="username" type="text" 
          value={username}
          onChange={({ target }) => setUsername(target.value)} label="username" variant="standard" />
      </div>
     
     <div>
        <TextField id="password" type="password" 
          value={password}
          onChange={({ target }) => setPassword(target.value)} label="password" variant="standard" />
     </div>
      
      
    </Box>
    <div>
      <Button type="submit" variant="contained" style={{ marginTop: 10 }}>login</Button>
    </div>
    

    </div>
    
  </form>
)

export default LoginForm