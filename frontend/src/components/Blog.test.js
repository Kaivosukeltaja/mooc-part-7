import React from 'react'
// import { shallow } from 'enzyme'
import { shallowWithStore } from 'enzyme-redux'
import { createMockStore } from 'redux-test-utils'
import renderer from 'react-test-renderer'
import MockRouter from 'react-mock-router'
import { Link } from 'react-router-dom'
import { Blog } from './Blog'

const mockState = {
  users: {
    currentUser: null,
  }
}

describe('<Blog />', () => {
  const blog = {
    title: 'Test blog',
    author: 'Test Author',
    url: 'https://google.com',
    likes: 123,
    user: {
      username: 'foobar',
      name: 'Foo Bar',
    }
  }

  const mockStore = createMockStore(mockState)

  it('renders correctly', () => {
    const tree = renderer
      .create(<MockRouter>
        <Blog blog={blog} />
      </MockRouter>)
      .toJSON()
    expect(tree).toMatchSnapshot()

  })

  it('contains a link to the article', () => {
    const blogComponent = shallowWithStore(<Blog blog={blog} />, mockStore)
    
    const titleLinks = blogComponent.find(Link)

    expect(titleLinks.length).toBe(1)
  })
})
