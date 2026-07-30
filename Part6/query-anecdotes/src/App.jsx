import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import {useAnecdotes} from './hooks/useAnecdotes'

const App = () => {

  const {isError , isPending , updateAnecdoteMutation, anecdotes} = useAnecdotes()

  const handleVote = (anecdote) => {
    console.log('vote')
    updateAnecdoteMutation.mutate({...anecdote , votes : anecdote.votes + 1})
  }
  //console.log(JSON.parse(JSON.stringify(result)))
 
  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: Anecdote service not available due to problems in the server</span>
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App