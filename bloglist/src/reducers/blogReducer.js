const initialState = {
  blogs: [],
}

export default (state = initialState, action) => {
  switch(action.type) {
  case 'BLOGS_LOADED':
    return { ...state, blogs: action.blogs }
  case 'BLOG_CREATED':
    return { ...state, blogs: [ ...state.blogs, action.blog ] }
  case 'BLOG_UPDATED':
    return { ...state, blogs: state.blogs.map(blog => blog._id === action.blog._id ? action.blog : blog) }
  default:
    return state
  }
}
