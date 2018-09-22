import React from 'react'
import PropTypes from 'prop-types'
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../actions/users'

const styles = {
  navbar: {
    backgroundColor: '#ffffff',
    boxShadow: '5px 5px 5px rgba(0,0,0,0.25)',
    padding: '1em',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
  },
  link: {
    textDecoration: 'none',
    fontWeight: 'bold',
    padding: '1em',
    borderRadius: '10px',
    color: '#666666',
  },
  linkActive: {
    backgroundColor: '#666666',
    color: '#ffffff',
  },
  user: {
    marginLeft: 'auto',
  },
  userName: {
    fontWeight: 'bold',
  },
  logout: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    marginLeft: '1em',
  }
}

const Navigation = (props) => {
  return (
    <div style={styles.navbar}>
      <NavLink exact style={styles.link} to="/" activeStyle={styles.linkActive}>Blogs</NavLink>&nbsp;
      <NavLink style={styles.link} to="/users" activeStyle={styles.linkActive}>Users</NavLink>&nbsp;
      <div style={styles.user}>
        <span style={styles.userName}>{props.currentUser.name}</span>
        <input style={styles.logout} type="button" value="logout" onClick={props.logout} />
      </div>
    </div>
  )
}

Navigation.propTypes = {
  currentUser: PropTypes.shape().isRequired,
  logout: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  currentUser: state.users.currentUser,
})

const mapDispatchToProps = {
  logout,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navigation))
