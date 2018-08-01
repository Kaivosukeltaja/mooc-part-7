import React from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Notification from './components/Notification'
import AddBlog from './components/AddBlog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'

const appStyle = {
  backgroundColor: '#f0f0f0',
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  padding: '1em 2em',
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
    this.state = {
      username: '',
      password: '',
      error: null,
      currentUser: null,
      addedBlog: null,
      blogs: []
    }
  }

  handleLoginChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  addLike = async (blog) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    await blogService.update(updatedBlog)
    const newBlogs = this.state.blogs.map(blog => blog._id === updatedBlog._id ? updatedBlog : blog)
    this.setState({ blogs: newBlogs })
  }

  handleCreateBlog = (blog) => {
    this.setState({
      blogs: [ ...this.state.blogs, blog ],
      addedBlog: blog,
    })
    setTimeout(() => {
      this.setState({ addedBlog: null })
    }, 5000)
  }

  logout() {
    this.setState({ currentUser: null })
    window.localStorage.clear()
  }

  handleLoginSubmit = async (event) => {
    event.preventDefault()
    try {
      const result = await loginService.doLogin({
        username: this.state.username,
        password: this.state.password
      })
      this.setState({ currentUser: result })
      window.localStorage.setItem('currentUser', JSON.stringify(result))
    } catch (error) {
      this.setState({ error: 'Invalid username or password!' })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs => this.setState({ blogs }))

    const loggedUserJSON = window.localStorage.getItem('currentUser')
    if (loggedUserJSON) {
      const currentUser = JSON.parse(loggedUserJSON)
      this.setState({ currentUser })
      blogService.setToken(currentUser.token)
    }
  }

  render() {
    return (
      <div style={appStyle}>
        {this.state.error !== null && (
          <Notification error message={this.state.error} />
        )}
        {this.state.addedBlog !== null && (
          <Notification message={`Added new blog ${this.state.addedBlog.title}!`} />
        )}
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
            {this.state.blogs.map(blog => <Blog key={blog._id} blog={blog} addLike={this.addLike} />)}
            <Togglable buttonLabel="Add blog">
              <AddBlog onCreate={this.handleCreateBlog} />
            </Togglable>
          </div>
        )}
      </div>
    )
  }
}

export default App
