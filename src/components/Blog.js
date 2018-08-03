import React from 'react'
import PropTypes from 'prop-types'

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

const visibleDetails = {
  display: 'block',
}

const hiddenDetails = {
  display: 'none',
}

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showDetails: false,
    }
  }

  addLike = () => { this.props.addLike(this.props.blog) }

  toggleDetails = () => {
    this.setState({ showDetails: !this.state.showDetails })
  }

  deleteBlog = () => { this.props.deleteBlog(this.props.blog) }
  
  render() {
    return (
      <div className="blog" style={blogStyle}>
        <div
          className="blog__title"
          style={blogHeadingStyle}
          onClick={this.toggleDetails}  
        >
          {this.props.blog.title} {this.props.blog.author}
        </div>
        <div className="blog__details" 
          style={this.state.showDetails ? visibleDetails : hiddenDetails}
        >
          <div><a href={this.props.blog.url}>{this.props.blog.url}</a></div>
          { this.props.blog.user && 
            <div>Added by { this.props.blog.user.name }</div>
          }
          <div>Likes: {this.props.blog.likes} <button onClick={this.addLike}>Like</button></div>
          { this.props.deleteBlog &&
            <button onClick={this.deleteBlog}>Delete</button>
          }
        </div>
      </div>
    )
  }
}

Blog.propTypes = {
  addLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func,
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    })
  })
}

export default Blog
