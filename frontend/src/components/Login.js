import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { login, logout } from '../actions/users'

const styles = {
  container: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    borderBottom: '1px solid #eeeeee',
    margin: 0,
  },
  card: {
    backgroundColor: '#ffffff',
    boxShadow: '3px 3px 3px rgba(0,0,0,0.25)',
    padding: '1em 2em',
    borderRadius: '4px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  input: {
    margin: '0.5em 0',
    padding: '0.5em',
  },
  submit: {
    padding: '1em',
    margin: '0.5em 0',
  }
}

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
      <form onSubmit={this.onSubmit} style={styles.container}>
        <div style={styles.card}>
          <h2>Log in to blog application</h2>
          <input
            name="username"
            value={this.state.username}
            placeholder="Username"
            onChange={this.onChange}
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.onChange}
            style={styles.input}
          />
          <input type="submit" value="Log in" style={styles.submit} />
        </div>
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
