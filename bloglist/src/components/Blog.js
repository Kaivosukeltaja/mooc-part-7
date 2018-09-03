import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const blogStyle = {
  backgroundColor: '#ffffff',
  padding: '1em',
  borderRadius: '4px',
  color: '#333333',
  margin: '0.25em 0',
}

const blogHeadingStyle = {
  fontWeight: 'bold',
  fontSize: '1.25em',
  cursor: 'pointer',
}

const Blog = (props) => (
  <div style={blogStyle}>
    <Link
      style={blogHeadingStyle}
      to={`/blogs/${props.blog._id}`}
    >
      {props.blog.title} - {props.blog.author}
    </Link>
  </div>
)

export const blogShape = PropTypes.shape({
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  })
})

Blog.propTypes = {
  currentUser: PropTypes.shape(),
  blog: blogShape,
}

const mapStateToProps = (state) => ({
  currentUser: state.users.currentUser,
})

export default connect(mapStateToProps)(Blog)
