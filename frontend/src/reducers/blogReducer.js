const initialState = {
  blogs: [],
}

const getUpdatedBlogs = (state, action) => 
  state.blogs.map(blog => blog._id === action.blog._id ? action.blog : blog)

export default (state = initialState, action) => {
  switch(action.type) {
  case 'BLOGS_LOADED':
    return { ...state, blogs: action.blogs }
  case 'BLOG_CREATED':
    return { ...state, blogs: [ ...state.blogs, action.blog ] }
  case 'BLOG_UPDATED':
    return { ...state, blogs: getUpdatedBlogs(state, action) }
  case 'COMMENT_ADDED':
    return { ...state, blogs: getUpdatedBlogs(state, action) }
  case 'DELETE_BLOG':
    return { ...state, blogs: state.blogs.filter(b => b._id !== action.blog._id) }
  default:
    return state
  }
}
