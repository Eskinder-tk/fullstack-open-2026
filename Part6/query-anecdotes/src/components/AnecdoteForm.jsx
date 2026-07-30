import {useAnecdotes} from '../hooks/useAnecdotes'
import useNotify from '../hooks/useNotify'

const AnecdoteForm = () => {

  const {setMessage} = useNotify()

  const {newAnecdoteMutation} = useAnecdotes()


  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.reset()
    newAnecdoteMutation.mutate({ content, votes: 0 })
    setMessage(`New anecdote '${content}' added`)
    setTimeout(() => {
      setMessage('')
    }, 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={addNote}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm