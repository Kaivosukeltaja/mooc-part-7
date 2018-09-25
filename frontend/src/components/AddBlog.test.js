import React from 'react'
import renderer from 'react-test-renderer'
import { AddBlog } from './AddBlog'

describe('<AddBlog />', () => {
  const addBlog = jest.fn()
  const showNotification = jest.fn()

  it('renders correctly', () => {
    const tree = renderer
      .create(<AddBlog addBlog={addBlog} showNotification={showNotification} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
