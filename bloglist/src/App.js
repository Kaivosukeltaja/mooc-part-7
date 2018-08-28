import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Blog, { blogShape } from './components/Blog'
import Login from './components/Login'
import Notification, { notificationShape } from './components/Notification'
import AddBlog from './components/AddBlog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import { loadBlogs } from './actions/blogs'
import { showNotification } from './actions/notifications'

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
    blogs: PropTypes.arrayOf(blogShape),
    notifications: PropTypes.arrayOf(PropTypes.shape(notificationShape)),
  }

  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
    this.state = {
      username: '',
      password: '',
      currentUser: null,
    }
  }

  handleLoginChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  logout() {
    this.setState({ currentUser: null })
    blogService.setToken(null)
    window.localStorage.clear()
  }

  deleteBlog = async (blog) => {
    if (window.confirm(`Really delete ${blog.title} by ${blog.author}?`)) {
      await blogService.deleteBlog(blog)
      this.setState({ blogs: this.state.blogs.filter(b => b._id !== blog._id) })
    }
  }

  handleLoginSubmit = async (event) => {
    event.preventDefault()
    try {
      const result = await loginService.doLogin({
        username: this.state.username,
        password: this.state.password
      })
      this.setState({ currentUser: result })
      blogService.setToken(result.token)
      window.localStorage.setItem('currentUser', JSON.stringify(result))
    } catch (error) {
      this.setState({ error: 'Invalid username or password!' })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  componentDidMount() {
    this.props.loadBlogs()

    const loggedUserJSON = window.localStorage.getItem('currentUser')
    if (loggedUserJSON) {
      const currentUser = JSON.parse(loggedUserJSON)
      this.setState({ currentUser })
      blogService.setToken(currentUser.token)
    }
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
        {this.state.currentUser === null && (
          <Login
            username={this.state.username}
            password={this.state.password}
            onChange={this.handleLoginChange}
            onSubmit={this.handleLoginSubmit}
          />
        )}
        {!!this.state.currentUser && (
          <div className="bloglist">
            <h2>blogs</h2>
            <p>
              {this.state.currentUser.name} logged in
              <input type="button" value="logout" onClick={this.logout} />
            </p>
            {blogs.map(blog => (
              <Blog 
                key={blog._id}
                blog={blog} 
                deleteBlog={(!blog.user || this.state.currentUser.id === blog.user._id) ? this.deleteBlog : undefined}
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
})

const mapDispatchToProps = {
  loadBlogs,
  showNotification,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
