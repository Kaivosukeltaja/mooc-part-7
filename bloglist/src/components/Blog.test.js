import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe.only('<Blog />', () => {
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

  const deleteBlog = jest.fn()
  const addLike = jest.fn()

  it('renders only title by default', () => {
    const blogComponent = shallow(<Blog blog={blog} deleteBlog={deleteBlog} addLike={addLike} />)
    
    const titleDiv = blogComponent.find('.blog__title')
    const detailsDiv = blogComponent.find('.blog__details')

    expect(titleDiv.text()).toContain(`${blog.title} ${blog.author}`)
    expect(detailsDiv.getElement().props.style).toEqual({ display: 'none' })
  })

  it('shows details when title is clicked', () => {
    const blogComponent = shallow(<Blog blog={blog} deleteBlog={deleteBlog} addLike={addLike} />)
    
    const titleDiv = blogComponent.find('.blog__title')
    titleDiv.simulate('click')
    const detailsDiv = blogComponent.find('.blog__details')

    expect(detailsDiv.getElement().props.style).toEqual({ display: 'block' })
    expect(detailsDiv.text()).toContain(`Likes: ${blog.likes}`)
  })
})
