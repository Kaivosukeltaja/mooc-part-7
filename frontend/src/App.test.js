import React from 'react'
// import { mount } from 'enzyme'
import { createMockStore } from 'redux-test-utils'
import { mountWithStore } from 'enzyme-redux'
import App from './App'
import Blog from './components/Blog'
import Login from './components/Login'
jest.mock('./services/blogs')
import blogService from './services/blogs'
import { mockUser, mockState, mockLoggedInState } from './utils/mockStore'

describe('<App />', () => {
  let app

  describe('when not logged in', () => {
    beforeAll(() => {
      const mockStore = createMockStore(mockState)
      app = mountWithStore(<App />, mockStore)
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

      localStorage.setItem('currentUser', JSON.stringify(mockUser))
      const mockStore = createMockStore(mockLoggedInState)
      app = mountWithStore(<App />, mockStore)
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
