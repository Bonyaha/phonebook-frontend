import { useEffect, useState } from 'react'
import Notification from './Notification'
import ErrorNotification from './ErrorNotification'
import Search from './Search'
import PersonForm from './PersonForm'

import Persons from './Persons'
import phoneService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [notification, setNotification] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [personEditing, setPersonEditing] = useState(null)
  const [editingText, setEditingText] = useState('')
  useEffect(() => {
    phoneService.getAll().then((res) => {
      setPersons(res)
    })
  }, [])

  const addPerson = (e) => {
    e.preventDefault()
    const newPerson = { name: newName, number: newNumber }
    phoneService
      .create(newPerson)
      .then((response) => {
        setPersons(persons.concat(response))
        setNewName('')
        setNumber('')
        setNotification(`Added ${newName}`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
      .catch((error) => {
        // this is the way to access the error message
        console.log(error.response.data.error)
        setErrorMessage(`${error.response.data.error} `)
        setNewName('')
        setNumber('')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNumber(e.target.value)
  }

  //search for person
  const filterPersons = (e) => {
    const query = e.target.value
    console.log(query)
    let updatedList = persons.filter((item) => {
      return item.name.toLowerCase().includes(query.toLowerCase())
    })
    console.log(updatedList)
    if (query !== '') {
      setPersons(updatedList)
    } else {
      phoneService.getAll().then((res) => {
        setPersons(res)
      })
    }
  }

  const deleteNum = (id, name) => {
    if (window.confirm(`Delete person ${name}?`)) {
      phoneService.del(id)
      let updated = persons.filter((person) => person.id !== id)
      setPersons(updated)
    } else {
      return
    }
  }
  const submitEdits = (id) => {
    const person = persons.find((n) => n.id === id)
    console.log(editingText)
    const changedPerson = { ...person, name: newName, number: newNumber }
    phoneService
      .update(id, changedPerson)
      .then((returnedPerson) => {
        console.log(returnedPerson)
        setPersons(
          persons.map((person) => (person.id !== id ? person : returnedPerson))
        )

        setNewName('')
        setNumber('')
      })
      .catch((error) => {
        // this is the way to access the error message
        console.log(error.response.data.error)
        setErrorMessage(`${error.response.data.error} `)
        setNewName('')
        setNumber('')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })

    setPersonEditing(null)
  }

  return (
    <div className="container mt-3 w-75 ">
      <Notification message={notification} />
      <ErrorNotification message={errorMessage} />
      <h2 className="h1">Phonebook</h2>
      <Search onChange={filterPersons} />

      <br />
      <br />
      <h3>Add a new person</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        deleteNum={deleteNum}
        submitEdits={submitEdits}
        setEditingText={setEditingText}
        setPersonEditing={setPersonEditing}
        personEditing={personEditing}
        setNewName={setNewName}
        setNumber={setNumber}
      />
    </div>
  )
}

export default App
