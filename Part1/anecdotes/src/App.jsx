import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.' , 
    'Adding manpower to a late software project makes it later!' , 
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.' , 
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.' , 
    'Premature optimization is the root of all evil.' , 
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.' , 
    'The only way to go fast, is to go well.' ,
  ]
   
  const [selected, setSelected] = useState(0)
  const [voted , setVoted] = useState([0 , 0 , 0 , 0 , 0 , 0 , 0 , 0])

  const clickHandler = () => {
    let randomNUm = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomNUm)
  }

  const voteA = [...voted]
  const max = voted.indexOf(Math.max(...voted))

  const voteHandler = () => {
    voteA[selected] += 1
    setVoted(voteA)
    }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>"{anecdotes[selected]}"</p>

      <div>
        <p>has  {voteA[selected]}  votes</p>
        <button onClick={voteHandler}  >vote</button>
        <button onClick={clickHandler}>next anecdote</button>
      </div>

      <h2>Anecdote with the most votes</h2>

      <p>"{anecdotes[max]}"</p>
    </div>
  )
}

export default App
