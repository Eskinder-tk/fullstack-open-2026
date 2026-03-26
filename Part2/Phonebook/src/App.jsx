import { useEffect, useState } from 'react'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNum , setNewNum] = useState('')
  const [newSearch , setNewSearch] = useState('')

  useEffect(() => {
    console.log('effect');
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('fulfilled')
        setPersons(response.data)
      })
  }, [])

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