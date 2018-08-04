import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
import Login from './components/Login'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App />', () => {
  let app

  describe('when not logged in', () => {
    beforeAll(() => {
      app = mount(<App />)
    })

    it('renders no blogs and just the login form', () => {
      app.update()
      const blogComponents = app.find(Blog)
      expect(blogComponents.length).toEqual(0 /* blogService.blogs.length */)
      const loginComponents = app.find(Login)
      expect(loginComponents.length).toEqual(1)
    })
  })

  describe('when logged in', () => {
    beforeAll(() => {
      const user = {
        username: 'foo',
        name: 'Foo',
        id: '123456',
        token: 'fake token',
      }
      localStorage.setItem('currentUser', JSON.stringify(user))      
      app = mount(<App />)
    })

    it('renders the blogs and no login form', () => {
      app.update()
      const blogComponents = app.find(Blog)
      expect(blogComponents.length).toEqual(blogService.blogs.length)
      const loginComponents = app.find(Login)
      expect(loginComponents.length).toEqual(0)
    })
  })

    
})
