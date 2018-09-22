import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const styles = {
  cell: {
    padding: '0.25em',
    minWidth: '100px',
  },
  heading: {
    borderBottom: '1px solid #333333',
    backgroundColor: '#d0d0d0',
    textAlign: 'left',
  },
  row: [
    { backgroundColor: 'white' },
    { backgroundColor: 'transparent' },
  ]
}

const Users = (props) => {
  return (
    <div >
      <h2>Users</h2>
      <table cellSpacing="0">
        <thead>
          <tr style={styles.heading}>
            <th style={styles.cell}>User</th>
            <th style={styles.cell}>Blogs</th>
          </tr>
        </thead>
        <tbody>
          { props.users.map((user, index) => (
            <tr key={user.username} style={styles.row[index % 2]}>
              <td style={styles.cell}><Link to={`/users/${user.username}`}>{user.name}</Link></td>
              <td style={styles.cell}>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
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
