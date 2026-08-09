import { TextField , Button  , Box} from '@mui/material'
import { useCredentials , useLogActions } from '../hooks/useLogin'
import { useNavigate } from 'react-router-dom'
import useNotificationStore from '../hooks/useNotification'


const LoginForm = () => {

  const {setNewMessage , setError} = useNotificationStore()

  const {setPassword , setUsername , logIn ,setUser } = useLogActions()
  const {password , username, user} = useCredentials()
  const navigate = useNavigate()



  const handleLogin = async (event) => {
    event.preventDefault();
    const loggedUser = await logIn()
    if (loggedUser) {
      setUsername("");
      setPassword("");
      navigate("/");
      setNewMessage(`${loggedUser.name} successfully logged in`);
      setTimeout(() => {
        setNewMessage(null);
      }, 5000);
    }else {
      setError("wrong credentials");
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
      
    
  };
  
  return (
  <form onSubmit={handleLogin}>
    <div>
      <h2>Log in to application</h2>
      <Box
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
)}

export default LoginForm