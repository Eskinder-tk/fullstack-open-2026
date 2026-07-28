import { useAnecdotes , useAnecdoteActions } from '../store'
import {useNotficationAction} from '../notificationStore'

const AnecdoteList = () => {
    const anecdotes = useAnecdotes()
    const { voteInc , deleteAnecdote } = useAnecdoteActions()
    const {setMessage} = useNotficationAction()

    const handleVote = async (anecdote) => {
      await voteInc(anecdote.id)
      setMessage(`You voted '${anecdote.content}'`)
      setTimeout(() => {
      setMessage(null)
    }, 5000)
    }

    const handleDelete = async (anecdote) => {
      await deleteAnecdote(anecdote.id)
      setMessage(`You successfully deleted anecdote '${anecdote.content}'`)
      setTimeout(() => {
      setMessage(null)
    }, 5000)
    }

    return (
        <div>
            {anecdotes.map(anecdote => (
        <div key={anecdote.id} className='anecdote'>
          <div >{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={ () => handleVote(anecdote)}>vote</button>
            {anecdote.votes === 0 && <button onClick={ () => handleDelete(anecdote)}>Delete</button>}
          </div>
        </div>
      ))}
      
        </div>
    )

}
export default AnecdoteList
