import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { login, logout } from '../actions/users'

const initialState = {
  username: '',
  password: '',
}

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState
  }

  onSubmit = (event) => {
    event.preventDefault()
    this.props.login(this.state.username, this.state.password)
  } 

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }  

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <h2>Log in to blog application</h2>
        <p>
          Username:{' '}
          <input
            name="username"
            value={this.state.username}
            onChange={this.onChange}
          />
        </p>
        <p>
          Password:{' '}
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
          />
        </p>
        <p>
          <input type="submit" value="Log in" />
        </p>
      </form>
    )
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
  login,
  logout,
}

export default connect(null, mapDispatchToProps)(Login)
