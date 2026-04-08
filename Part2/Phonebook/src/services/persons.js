import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => {
    return response.data
  })
}

const create = nameObject => {
  const request = axios.post(baseUrl, nameObject)
  return request.then(response => {
    return response.data
})
}

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => {
    return response.data
})
}

const update = (id, changedNum) => {
    const request = axios.put(`${baseUrl}/${id}`, changedNum)
    return request.then(response => {
        console.log(response)
        return response.data
    })
}

export default { getAll, create, remove, update }