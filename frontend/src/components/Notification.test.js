import React from 'react'
import { mount } from 'enzyme'
import Notification from './Notification'

describe('<Notification />', () => {
  it('should be red if it is an error', () => {
    const notification = mount(<Notification error={true} message="foobar" />)
    const notificationDiv = notification.find('div')

    expect(notificationDiv.getElement().props.style.color).toEqual('red')
  })

  it('should be green if it is not an error', () => {
    const notification = mount(<Notification error={false} message="foobar" />)
    const notificationDiv = notification.find('div')

    expect(notificationDiv.getElement().props.style.color).toEqual('green')
  })
})
