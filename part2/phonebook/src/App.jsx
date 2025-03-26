import { useState, useEffect } from 'react'
import PersonServices from './services/person'
import axios from 'axios'

const PersonForm = ({ onSubmit, nameChange, numberChange }) => {
return (
<form onSubmit={onSubmit}>
      <div>
        <div>
name: <input onChange={nameChange} />
</div>
        <div>
number: <input onChange={numberChange} />
</div>
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
      filter shown with <input type="text" onChange={onChange} />
      <div>
        {searches.map(person => <div key={person.id}>
{person.name}
</div>
)}
</div>
</div>
)
}
const Notification = ({message, noti})=>{
if (message === null && noti === null ){
return null
} else if (noti === null){return(<div className='error'>
{message}
</div>
)} else {
return(<div className='notify'>
{noti}
</div>
)
}
}
const App = () => {
const [persons, setPersons] = useState([])
const [newNumber, setNewNumber] = useState('')
const [newName, setNewName] = useState('')
const [errorMessage, setErrorMessage] = useState(null)
const [notify, setNotify] = useState(null)

useEffect(()=>{
PersonServices.getAll().then(response =>setPersons(response))}, [])

const addPerson = (event) => {
event.preventDefault()
const newPerson = {
name: newName,
number: newNumber
}
const existperson = persons.some(person => person.name.toLowerCase().includes(newPerson.name.toLowerCase()))

if (!existperson){
PersonServices.create(newPerson).then(response=>{
setPersons(persons.concat(response))
setNotify(`Added ${response.name}.`)
setTimeout(function() {setNotify(null)}, 3000);
})
} else {
if (confirm(`${newName} is already added to the phonebook, replace the old number with the new ones?`)){
const p = persons.find(p => p.name.toLowerCase() == newPerson.name.toLowerCase())
const newpersons = {
...p,
number: newNumber
}
PersonServices.patching(p.id, newpersons).then(res=>{
setPersons(persons.map(per=>per.id == p.id? res: per))
setNotify(`${p.name} number changed to ${newpersons.number}`)
setTimeout(function() {setNotify(null)}, 3000);
})
}
}
setNewName("")
setNewNumber("")
}

const deleteHandler = (id,name)=>{
if (confirm(`Are you use you want to delete ${name} ?`)){
PersonServices.deletePerson(id).then(response=>{
setPersons(persons.filter(p => p.id != id))
setNotify(`${name} was removed.`)}
).catch(err=>{
setErrorMessage(`Person '${err}' was already removed from server`)})
setTimeout(()=>{
setErrorMessage(null)
}, 5000);
setPersons(persons.filter(p => p.id != id))
}
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
? persons: persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

return (
<div>
<Notification message={errorMessage} noti={notify} />
<h1>Phonebook</h1>
<Filter searches={searchingFilter} onChange={filterChange} />
<h1>Add new</h1>
<PersonForm onSubmit={addPerson} nameChange={nameChangeHandler} numberChange={numberChangeHandler} />
<h1>Numbers</h1>
{persons.map(person => <div key={person.id}>
{person.name} {person.number} <button onClick={()=>deleteHandler(person.id, person.name)}>delete</button>
</div>
)}
</div>
)
}

export default App