const { setup: setupPuppeteer } = require('jest-environment-puppeteer')
const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const { listWithManyBlogs, testUserCredentials } = require('./data/blogs')
const Blog = require('../models/blog')
const User = require('../models/user')

module.exports = async function globalSetup() {
  await setupPuppeteer()
  await Blog.remove({})
  await User.remove({})

  await api.post('/api/users').send(testUserCredentials)

  const blogObjects = listWithManyBlogs.map(n => new Blog(n))
  await Promise.all(blogObjects.map(n => n.save()))
  await server.close()
}
