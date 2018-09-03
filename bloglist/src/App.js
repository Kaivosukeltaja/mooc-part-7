import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { blogShape } from './components/Blog'
import Login from './components/Login'
import Notification, { notificationShape } from './components/Notification'
import Navigation from './components/Navigation'
import { loadBlogs } from './actions/blogs'
import { showNotification } from './actions/notifications'
import { logout, initUser, loadUsers } from './actions/users'
import BlogsPage from './pages/blogs'
import BlogPage from './pages/blog'
import UsersPage from './pages/users'
import UserPage from './pages/user'

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
    loadUsers: PropTypes.func.isRequired,
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
    this.props.loadUsers()
  }

  render() {
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
          <Router>
            <div className="bloglist">
              <Navigation />
              <Route exact path="/" render={() => <BlogsPage />} />
              <Route exact path="/users" render={() => <UsersPage />} />
              <Route path="/users/:username" render={({match}) => <UserPage username={match.params.username} />} />
              <Route path="/blogs/:id" render={({match}) => <BlogPage id={match.params.id} />} />
            </div>
          </Router>
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
  loadUsers,
  showNotification,
  logout,
  initUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
