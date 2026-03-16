import { useState } from 'react'

const Display = (props) =>  <div><h1>{props.text}</h1></div>

const Buttons = (props) => {
  return (
    <>
      <button onClick={props.onClick} >{props.text}</button>
    </>
  )
}

const Tot = (props) => {
  let total = props.good + props.neutral + props.bad
  return (
    <><p>all : {total}</p></>
  )
}

const Avg = (props) => {
  let nem = props.good - props.bad
  let total = props.good + props.neutral + props.bad
  let avg = 0
  if (total == 0) {
    avg = 0
  } else {
    avg = nem / total
  }
  return (
    <>
      <p>average : {avg}</p>
    </>
  )
}

const Positive = (props) => {
  let good = props.good
  let total = props.good + props.neutral + props.bad
  let pos = 0
  if (total == 0) {
    pos = 0
  } else {
    pos = (good / total) * 100
  }
  return (
    <>
      <p>positive reviews : {pos}%</p>
    </>
  )
}

const StatisticLine = (props) => <div><p>{props.txt} : {props.value}</p></div>
  
const Statistics = (props) => {
  let good = props.good
  let neutral = props.neutral
  let bad = props.bad
  let total = props.good + props.neutral + props.bad
  if (total == 0){
    return (
      <div>
        <h3>No feedback given</h3>
      </div>
    )
  } else {
    return (
      <div>
        <StatisticLine txt = 'good' value = {good} />
        <StatisticLine txt = 'neutral' value = {neutral} />
        <StatisticLine txt = 'bad' value = {bad} />
        <Tot good = {good} neutral = {neutral} bad = {bad}/>
        <Avg good = {good} neutral = {neutral} bad = {bad}/>
        <Positive good = {good} neutral = {neutral} bad = {bad}/>
      </div>
  )}
}

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