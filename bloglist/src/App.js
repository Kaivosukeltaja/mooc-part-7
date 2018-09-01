import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Blog, { blogShape } from './components/Blog'
import Login from './components/Login'
import Notification, { notificationShape } from './components/Notification'
import AddBlog from './components/AddBlog'
import Togglable from './components/Togglable'
import { loadBlogs } from './actions/blogs'
import { showNotification } from './actions/notifications'
import { logout, initUser } from './actions/users'

const appStyle = {
  backgroundColor: '#f0f0f0',
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  padding: '1em 2em',
}

class App extends React.Component {
  static propTypes = {
    loadBlogs: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    initUser: PropTypes.func.isRequired,
    currentUser: PropTypes.shape(),
    blogs: PropTypes.arrayOf(blogShape),
    notifications: PropTypes.arrayOf(PropTypes.shape(notificationShape)),
  }

  componentDidMount() {
    this.props.loadBlogs()
    this.props.initUser()
  }

  render() {
    const blogs = this.props.blogs.sort((a, b) => a.likes >= b.likes ? -1 : 1)
    return (
      <div style={appStyle}>
        {this.props.notifications.map((notification) => (
          <Notification
            key={notification.id}
            error={notification.error}
            message={notification.text}
          />
        ))}
        {this.props.currentUser === null && (
          <Login />
        )}
        {!!this.props.currentUser && (
          <div className="bloglist">
            <h2>blogs</h2>
            <p>
              {this.props.currentUser.name} logged in
              <input type="button" value="logout" onClick={this.props.logout} />
            </p>
            {blogs.map(blog => (
              <Blog 
                key={blog._id}
                blog={blog} 
              />
            ))}
            <Togglable buttonLabel="Add blog">
              <AddBlog />
            </Togglable>
          </div>
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(App)
