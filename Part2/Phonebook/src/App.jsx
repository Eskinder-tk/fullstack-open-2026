import { useState } from 'react'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNum , setNewNum] = useState('')
  const [newSearch , setNewSearch] = useState('')

  const personsToShow = persons.filter( item => item.name.toLowerCase().includes(newSearch.toLowerCase()) )
  
  
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
}
  const handleNumChange = (event) => {
    console.log(event.target.value)
    setNewNum(event.target.value)
}

  const checker = persons.filter(person => person.name === newName)
  
  const addPerson = (event) => {
    event.preventDefault()
    if (checker.length > 0) {
      return (
        alert(`${newName} is already added to phonebook`)
    )
  } else {
      const nameObject = {
        name: newName,
        number: newNum,
        id: persons.length + 1
  }
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNum('')
}
}


  return (
    <div>
      <h2>Phonebook</h2>

      <Filter setNewSearch={setNewSearch} />

      <h2>Add a new</h2>
      
      <PersonForm newName={newName} newNum={newNum}  handleNameChange={handleNameChange} handleNumChange={handleNumChange} addPerson={addPerson} />

      <h2>Numbers</h2>

      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App