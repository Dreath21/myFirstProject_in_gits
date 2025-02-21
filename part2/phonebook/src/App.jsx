import { useState } from 'react'

const Persons = ({ persons }) => {
  console.log("Persons running...", persons);
  return (
    <>
      {persons.map(person => <div key={person.id}>{person.name} {person.number}</div>
      )}
    </>
  )
}

const PersonForm = ({ onSubmit, nameChange, numberChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <div>name: <input onChange={nameChange} /></div>
        <div>number: <input onChange={numberChange} /></div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Filter = ({ searches, onChange }) => {
  return (
    <div>
      filter shown with <input type="text" onChange={onChange}/>
      <div>
        {searches.map(person => <div key={person.id}>{person.name}</div>)}
      </div>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    const x = persons.some(person => person.name.includes(newPerson.name))
    if (x) {
      alert(`${newPerson.name} already existed!`)
    } else {
      setPersons(persons.concat(newPerson))
    }

    setNewName('')
    setNewNumber("")
  }

  const nameChangeHandler = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const numberChangeHandler = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const [showAll, setShowAll] = useState(true)
  const [filter, setFilter] = useState('')

  const filterChange = (event) => {
    setFilter(event.target.value)
    setShowAll(event.target.value === "")
  }

  const searchingFilter =
    showAll
      ? persons
      : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searches={searchingFilter} onChange={filterChange} />
      <h2>Add new</h2>
      <PersonForm onSubmit={addPerson} nameChange={nameChangeHandler} numberChange={numberChangeHandler} />
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  )
}


export default App 