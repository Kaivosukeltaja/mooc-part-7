import React from 'react'
import PropTypes from 'prop-types'

const Login = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <h2>Log in to blog application</h2>
      <p>Username: <input name="username" value={props.username} onChange={props.onChange} /></p>
      <p>Password: <input type="password" name="password" value={props.password} onChange={props.onChange} /></p>
      <p><input type="submit" value="Log in" /></p>
    </form>
  )
}

Login.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default Login
