import React from 'react'
import PropTypes from 'prop-types'

const notificationStyle = {
  display: 'block',
  border: '2px solid',
  color: 'green',
  padding: '1em',
}

const errorStyle = {
  ...notificationStyle,
  color: 'red',
}

const Notification = props => {
  return <div style={props.error ? errorStyle : notificationStyle}>{props.message}</div>
}

export const notificationShape = {
  message: PropTypes.string.isRequired,
  error: PropTypes.bool,
}

Notification.propTypes = notificationShape

export default Notification
