const Total = (props) => {
  let total = props.good + props.neutral + props.bad
  return (
    <><p>{props.txt} {!Number.isNaN(total) ? total : ''}</p></>
  )
}

export default Total