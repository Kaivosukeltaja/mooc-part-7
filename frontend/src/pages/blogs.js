import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Blog, { blogShape } from '../components/Blog'
import AddBlog from '../components/AddBlog'
import Togglable from '../components/Togglable'
import { loadBlogs } from '../actions/blogs'
import { showNotification } from '../actions/notifications'
import { logout, initUser } from '../actions/users'

class Blogs extends React.Component {
  static propTypes = {
    loadBlogs: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    initUser: PropTypes.func.isRequired,
    currentUser: PropTypes.shape(),
    blogs: PropTypes.arrayOf(blogShape),
  }

  render() {
    const blogs = this.props.blogs.sort((a, b) => a.likes >= b.likes ? -1 : 1)
    return (
      <div className="bloglist">
        <h2>blogs</h2>
        {blogs.map(blog => (
          <Blog 
            key={blog._id}
            blog={blog} 
          />
        ))}
        <Togglable className="add-blog-button" buttonLabel="Add blog">
          <AddBlog />
        </Togglable>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  blogs: state.blogs.blogs,
  notifications: state.notifications.notifications,
  currentUser: state.users.currentUser,
})

const mapDispatchToProps = {
  loadBlogs,
  showNotification,
  logout,
  initUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(Blogs)
