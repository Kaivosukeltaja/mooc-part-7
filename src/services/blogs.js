import axios from 'axios'
const baseUrl = '/api/blogs'

let currentToken = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const setToken = (token) => {
  currentToken = token
}

export default { getAll, setToken }
