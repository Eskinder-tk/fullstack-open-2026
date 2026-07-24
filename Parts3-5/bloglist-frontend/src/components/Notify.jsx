import { Alert , Stack} from '@mui/material'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='notice'>
      <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity="success">{message}</Alert>
      </Stack>
    </div>
  )
}

export default Notification