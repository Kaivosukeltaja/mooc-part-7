import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { blogShape } from './Blog'
import CommentForm from './CommentForm'
import { addLike, deleteBlog } from '../actions/blogs'

const BlogDetails = ({ blog, currentUser, addLike, deleteBlog }) => {
  return (
    <div>
      <h2>
        {blog.author}: {blog.title}
      </h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      {blog.user && <div>Added by {blog.user.name}</div>}
      <div>
        Likes: {blog.likes} <button onClick={addLike}>Like</button>
      </div>
      {(!blog.user || currentUser.id === blog.user._id) && (
        <button onClick={deleteBlog}>Delete</button>
      )}
      <h3>Comments</h3>
      <ul>
        {blog.comments && blog.comments.map((comment, index) => (
          <li key={index}>{comment.text}</li>
        ))}
      </ul>
      <CommentForm blog={blog} />
    </div>
  )
}

BlogDetails.propTypes = {
  blog: blogShape,
  addLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func,
  currentUser: PropTypes.shape(),
}

const mapStateToProps = (state) => ({
  currentUser: state.users.currentUser,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  addLike: () => dispatch(addLike(ownProps.blog)),
  deleteBlog: () => dispatch(deleteBlog(ownProps.blog))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogDetails)
