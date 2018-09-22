import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Blog from '../components/Blog'
import BlogDetails from '../components/BlogDetails'

const BlogPage = (props) => {
  return (
    <div>
      {props.blog && (
        <BlogDetails blog={props.blog} />
      )}
    </div>
  )
}

BlogPage.propTypes = {
  blog: Blog.propTypes.blog,
  currentUser: Blog.propTypes.currentUser,
  addLike: PropTypes.func,
  deleteBlog: PropTypes.func,
}

const mapStateToProps = (state, ownProps) => {
  return {
    blog: state.blogs.blogs.find(blog => blog._id === ownProps.id),
    currentUser: state.users.currentUser,
  }
}

export default connect(mapStateToProps)(BlogPage)
