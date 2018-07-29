import React, { Component } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'

class AddBlog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      author: '',
      url: '',
    }
    this.handleLoginChange = this.handleLoginChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleLoginChange(event) {
    this.setState({ [event.target.name]: event.target.value })    
  }

  async handleSubmit(event) {
    event.preventDefault()
    const blog = await blogService.create({
      title: this.state.title, 
      author: this.state.author, 
      url: this.state.url
    })

    if (typeof this.props.onCreate === 'function') {
      this.props.onCreate(blog)
    }
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
  onCreate: PropTypes.func,
}

export default AddBlog
