const Persons = ({persons ,newSearch, deleteHandler}) => {
    const personsToShow = persons.filter( item => item.name.toLowerCase().includes(newSearch.toLowerCase()) )
    return(
      <div>
        {personsToShow.map(person => <p key={person.id}>{person.name} : {person.number}   
                                     <button id={person.id} onClick={() => deleteHandler(person.id)}>delete</button></p> )}
      </div>
    )
}

export default Persons