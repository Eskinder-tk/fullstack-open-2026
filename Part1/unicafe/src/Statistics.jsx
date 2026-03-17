import Total from "./Total"
import Avg from "./Avg"
import PositiveRev from "./PositiveRev"


const StatisticLine = (props) => <div><p>{props.txt} {props.value}</p></div>
  
const Statistics = (props) => {
  const mrk = '%'
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
        <table>
          <tbody>
          <tr>
            <td><StatisticLine txt = 'good' /></td>
            <td><StatisticLine value = {good} /></td>
          </tr>
          <tr>
            <td><StatisticLine txt = 'neutral' /></td>
            <td><StatisticLine value = {neutral} /></td>
          </tr>
          <tr>
            <td><StatisticLine txt = 'bad' /></td>
            <td><StatisticLine value = {bad} /></td>
          </tr>
          <tr>
            <td><Total txt = 'all'/></td>
            <td><Total good = {good} neutral = {neutral} bad = {bad} /></td>
          </tr>
          <tr>
            <td><Avg txt = 'average'/></td>
            <td><Avg good = {good} bad = {bad} total = {total}/></td>
          </tr>
          <tr>
            <td><PositiveRev txt= 'positive reviews'/></td>
            <td><PositiveRev good = {good} neutral = {neutral} bad = {bad} total = {total} mrk = {mrk}/></td>
          </tr>
         </tbody> 
        </table>
        
      </div>
  )}
}

export default Statistics