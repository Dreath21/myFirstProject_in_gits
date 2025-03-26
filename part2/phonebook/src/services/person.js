import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = ()=>{
    const reponse = axios.get(baseUrl)
    return reponse.then(response=>response.data)
}

const create = (newPerson)=>{
    const response = axios.post(baseUrl, newPerson)
    return response.then(response => response,data)
}
const deletePerson = (id)=>{
    return axios.delete(`${baseUrl}/${id}`)
}
const patching = (id, changes)=>{
    const response = axios.put(`$(baseUrl)/${id}`, changes)
    return response.then(response=>response.data)
}

export default {
    getAll,
    create,
    deletePerson,
    patching
}