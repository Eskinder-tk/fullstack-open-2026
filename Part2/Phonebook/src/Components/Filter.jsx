const Filter = (props) => {
    
    return (
      <form>
        <div>
         filter show with <input value={props.newSearch} onChange={(event) => props.setNewSearch(event.target.value)}/>
        </div>
      </form>
    )
}
export default Filter