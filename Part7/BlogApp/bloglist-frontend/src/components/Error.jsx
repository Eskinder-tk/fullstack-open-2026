import { Alert , Stack} from '@mui/material'
import useNotificationStore from '../hooks/useNotification'

const Error = () => {

  const {error} = useNotificationStore()

  if (error === null) {
    return null
  }

  return (
    <div className='error'>
      <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity="error">{error}</Alert>
      </Stack>
    </div>
  )
}

export default Error