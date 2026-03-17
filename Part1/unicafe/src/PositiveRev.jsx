const PositiveRev = (props) => {
  let pos = 0
  if (props.total == 0) {
    pos = 0
  } else {
    pos = (props.good / props.total) * 100 
  }
  return (
    <>
      <p>{props.txt} {!Number.isNaN(pos) ? pos : ''} {props.mrk}</p>
    </>
  )
}

export default PositiveRev