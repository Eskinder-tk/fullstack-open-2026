import { useAnecdotes , useAnecdoteActions } from '../store'


const AnecdoteList = () => {
    const anecdotes = useAnecdotes()
    const { voteInc } = useAnecdoteActions()

    return (
        <div>
            {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteInc(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
        </div>
    )

}
export default AnecdoteList
