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

const update = async (blog) => {
  const config = {
    headers: { 'Authorization': currentToken }
  }

  const response = await axios.put(`${baseUrl}/${blog._id}`, blog, config)
  return response.data
}

const deleteBlog = async (blog) => {
  const config = {
    headers: { 'Authorization': currentToken }
  }

  const response = await axios.delete(`${baseUrl}/${blog._id}`, config)
  return response.data
}

const setToken = (token) => {
  currentToken = `Bearer ${token}`
}

export default { getAll, create, update, deleteBlog, setToken }
