import { useAnecdoteActions } from '../store'
import {useNotficationAction} from '../notificationStore'

const AnecdoteForm = () => {
    const { add } = useAnecdoteActions()
    const { setMessage } = useNotficationAction()
    
    
  const addAnecdote = async (e) => {
    e.preventDefault()
    const form = e.target
    const content = form.anecdote.value

    await add(content)
    setMessage(`New Anecdote '${content}' has been added.`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
    form.reset()
  }

  return (
    <div>
        <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name='anecdote'/>
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )

}


export default AnecdoteForm