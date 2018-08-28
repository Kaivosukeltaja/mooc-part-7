import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addBlog } from '../actions/blogs'
import { showNotification } from '../actions/notifications'

const initialState = {
  title: '',
  author: '',
  url: '',
}

class AddBlog extends Component {
  constructor(props) {
    super(props)
    this.state = initialState
    this.handleLoginChange = this.handleLoginChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleLoginChange(event) {
    this.setState({ [event.target.name]: event.target.value })    
  }

  async handleSubmit(event) {
    event.preventDefault()
    this.props.addBlog({
      title: this.state.title, 
      author: this.state.author, 
      url: this.state.url
    })
    this.props.showNotification(`Added new blog ${this.state.title}`)
    this.setState(initialState)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Create new blog</h2>
        Title <input name="title" value={this.state.title} onChange={this.handleLoginChange} /><br />
        Author <input name="author" value={this.state.author} onChange={this.handleLoginChange} /><br />
        URL <input name="url" value={this.state.url} onChange={this.handleLoginChange} /><br />
        <input type="submit" value="Create blog" />
      </form>
    )
  }
}

AddBlog.propTypes = {
  addBlog: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
  addBlog,
  showNotification,
}

export default connect(null, mapDispatchToProps)(AddBlog)
