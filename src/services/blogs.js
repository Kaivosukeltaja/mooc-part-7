import axios from 'axios'
const baseUrl = '/api/blogs'

let currentToken = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (blog) => {
  const config = {
    headers: { 'Authorization': currentToken }
  }

  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const setToken = (token) => {
  currentToken = `Bearer ${token}`
}

export default { getAll, create, setToken }
