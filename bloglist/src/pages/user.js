import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { blogShape } from '../components/Blog'

const User = (props) => {
  return (
    <div>
      { props.user &&
        <div>
          <h2>{props.user.name}</h2>
          <h3>Added blogs</h3>
          <ul>
            { props.user.blogs.map(blog => (
              <li key={blog._id}>
                {blog.author} : {blog.title}
              </li>
            ))}
          </ul>
        </div>
      }
    </div>
  )
}

User.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    blogs: PropTypes.arrayOf(blogShape),
  }),
}

const mapStateToProps = (state, ownProps) => ({
  user: state.users.users.find(user => user.username === ownProps.username),
})

export default connect(mapStateToProps)(User)
