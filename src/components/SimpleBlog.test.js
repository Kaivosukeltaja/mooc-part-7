import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
  const blog = {
    title: 'Test blog',
    author: 'Test Author',
    likes: 123,
  }

  const onClick = jest.fn()

  it('renders content', () => {

    const blogComponent = shallow(<SimpleBlog blog={blog} onClick={onClick} />)
    
    const titleDiv = blogComponent.find('.blog__title')
    const detailsDiv = blogComponent.find('.blog__details')

    expect(titleDiv.text()).toContain(`${blog.title} ${blog.author}`)
    expect(detailsDiv.text()).toContain(`blog has ${blog.likes} likes`)
  })

  it('allows clicking the button', () => {
    const blogComponent = shallow(<SimpleBlog blog={blog} onClick={onClick} />)

    const button = blogComponent.find('button')
    button.simulate('click')
    button.simulate('click')
  
    expect(onClick.mock.calls.length).toBe(2)    
  })
})
