import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = (props) => {
  return (
    <div>
      <h2>Users</h2>
      <table>
        <th>
          <td>User</td>
          <td>Blogs</td>
        </th>
        { props.users.map((user) => (
          <tr key={user.username}>
            <td><Link to={`/users/${user.username}`}>{user.name}</Link></td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </table>
    </div>
  )
}

Users.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape()),
}

const mapStateToProps = (state) => ({
  users: state.users.users,
})

export default connect(mapStateToProps)(Users)
