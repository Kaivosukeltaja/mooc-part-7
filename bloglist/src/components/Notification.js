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

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  error: PropTypes.boolean,
}

export default Notification
