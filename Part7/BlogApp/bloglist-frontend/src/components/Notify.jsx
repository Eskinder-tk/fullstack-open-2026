import { Alert , Stack} from '@mui/material'
import useNotificationStore from '../hooks/useNotification'

const Notification = () => {

  const {newMessage} = useNotificationStore()

  if (newMessage === null) {
    return null
  }

  return (
    <div className='notice'>
      <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity="success">{newMessage}</Alert>
      </Stack>
    </div>
  )
}

export default Notification