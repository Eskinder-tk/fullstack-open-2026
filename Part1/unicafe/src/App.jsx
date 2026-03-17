import { useState } from 'react'
import Statistics from './Statistics'
import Buttons from './Buttons'


const Display = (props) =>  <div><h1>{props.text}</h1></div>


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodEventHandler = () => setGood(good + 1)
  const neutralEventHandler = () => setNeutral(neutral + 1)
  const badEventHandler = () => setBad(bad + 1)
  

  return (
    <div>
      <Display text = 'give feedback'/>

      <Buttons onClick={goodEventHandler} text = 'good'/>
      <Buttons onClick={neutralEventHandler} text = 'neutral'/>
      <Buttons onClick={badEventHandler} text = 'bad'/>

      <Display text = 'statistics'/>
      
      <Statistics good = {good} neutral = {neutral} bad = {bad} />
    </div>
    
  )
}

export default App