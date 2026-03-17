const Avg = (props) => {
  let nem = props.good - props.bad
  let avg = 0
  if (props.total == 0) {
    avg = 0
  } else {
    avg = nem / props.total
  }
  return (
    <>
      <p>{props.txt} {!Number.isNaN(avg) ? avg : ''}</p>
    </>
  )
}

export default Avg