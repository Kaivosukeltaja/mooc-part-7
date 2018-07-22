import React from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.handleLoginChange = this.handleLoginChange.bind(this)
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this)
    this.logout = this.logout.bind(this)
    this.state = {
      username: '',
      password: '',
      error: null,
      currentUser: null,
      blogs: [],
    }
    
  }

  handleLoginChange(event) {
    this.setState({ [event.target.name]: event.target.value })    
  }

  logout() {
    this.setState({ currentUser: null })
    window.localStorage.clear()
  }

  async handleLoginSubmit(event) {
    event.preventDefault()
    try {
      const result = await loginService.doLogin({ username: this.state.username, password: this.state.password })
      console.log(result)  
      this.setState({ currentUser: result })
      window.localStorage.setItem('currentUser', JSON.stringify(result))
    }
    catch(error) {
      this.setState({ error: 'Invalid username or password!' })
      setTimeout(() => { this.setState({ error: null })}, 5000)
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUserJSON = window.localStorage.getItem('currentUser')
    if (loggedUserJSON) {
      const currentUser = JSON.parse(loggedUserJSON)
      this.setState({ currentUser })
      blogService.setToken(currentUser.token)
    }    
  } 

  render() {
    return (
      <div>
        { this.state.error !== null &&
          <Notification message={this.state.error} />
        }
        { this.state.currentUser === null &&
          <Login
            username={this.state.username}
            password={this.state.password}
            onChange={this.handleLoginChange}
            onSubmit={this.handleLoginSubmit}
          />
        }
        { !!this.state.currentUser && 
          <div className="bloglist">
            <h2>blogs</h2>
            <p>
              {this.state.currentUser.name} logged in
              <input type="button" value="logout" onClick={this.logout} />
            </p>
            {this.state.blogs.map(blog => 
              <Blog key={blog._id} blog={blog}/>
            )}
          </div>
        }
      </div>
    );
  }
}

export default App;
