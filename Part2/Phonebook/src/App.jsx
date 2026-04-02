import { useEffect, useState } from 'react'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'
import pServiece from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNum , setNewNum] = useState('')
  const [newSearch , setNewSearch] = useState('')

  useEffect(() => {
    console.log('effect');
    pServiece
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  
  
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
}
  const handleNumChange = (event) => {
    console.log(event.target.value)
    setNewNum(event.target.value)
}

  
  const addPerson = (event) => {
    event.preventDefault()
    const checker = persons.find(person => person.name === newName)
    const changedNum = { ...checker , number : newNum}
    
    if ((checker !== undefined) && window.confirm(`${checker.name} is already in the phonebook, do you want to change the number.`)) {
      pServiece
        .update(checker.id, changedNum)
        .then(response => {
          setPersons(persons.map(person => person.id === checker.id ? response : person))
        })
      
  } else {
      const nameObject = {
        name: newName,
        number: newNum,
  }
      pServiece
        .create(nameObject)
        .then(response => {
          setPersons(persons.concat(response))
  })
    
    setNewName('')
    setNewNum('')
}
}

  const deleteHandler = (id) => {
    const deletedPerson = persons.find(n => n.id == id)
    const newPersons = persons.filter(n => n.id !== deletedPerson.id)
    if (window.confirm(`Are you sure you want to delete ${deletedPerson.name}?`)) {
      pServiece
        .remove(id)
        .then(response => {
          setPersons(newPersons)
      })
      .catch(error => console.log('something happend'))
          
  } else {
       setPersons(persons)
 }
  }


  return (
    <div>
      <h2>Phonebook</h2>

      <Filter setNewSearch={setNewSearch} />

      <h2>Add a new</h2>
      
      <PersonForm newName={newName} 
                  newNum={newNum}  handleNameChange={handleNameChange} 
                  handleNumChange={handleNumChange} addPerson={addPerson} />

      <h2>Numbers</h2>

      <Persons persons={persons} newSearch={newSearch} deleteHandler={deleteHandler}/>
    </div>
  )
}

export default App