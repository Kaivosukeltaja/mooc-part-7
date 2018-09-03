import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addComment } from '../actions/blogs'
import { blogShape } from './Blog'

class CommentForm extends Component {
  static propTypes = {
    blog: blogShape,
    addComment: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      commentText: '',
    }
  }

  onSubmit = (event) => {
    event.preventDefault()
    this.props.addComment(this.props.blog, this.state.commentText)
    this.setState({
      commentText: '',
    })
  }

  onChange = (event) => {
    this.setState({
      commentText: event.target.value,
    })
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input value={this.state.commentText} onChange={this.onChange} />
        <input type="submit" value="Add comment" />
      </form>
    )
  }
}

const mapDispatchToProps = {
  addComment,
}

export default connect(null, mapDispatchToProps)(CommentForm)
