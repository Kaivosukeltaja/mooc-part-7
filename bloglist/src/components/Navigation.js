import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../actions/users'

const styles = {
  link: {
    textDecoration: 'none',
  },
  linkActive: {
    textDecoration: 'underline',
    fontWeight: 'bold',
  },
}

const Navigation = (props) => {
  return (
    <div>
      <NavLink exact style={styles.link} to="/" activeStyle={styles.linkActive}>Blogs</NavLink>&nbsp;
      <NavLink style={styles.link} to="/users" activeStyle={styles.linkActive}>Users</NavLink>&nbsp;
      {props.currentUser.name} logged in&nbsp;
      <input type="button" value="logout" onClick={props.logout} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
