import {useAnecdotes} from '../hooks/useAnecdotes'

const AnecdoteForm = () => {

  const {newAnecdoteMutation} = useAnecdotes()


  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.reset()
    newAnecdoteMutation.mutate({ content, votes: 0 })
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