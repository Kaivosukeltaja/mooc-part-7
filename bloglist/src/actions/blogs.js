import blogService from '../services/blogs'

export const addBlog = ({ title, author, url }) => {
  return async (dispatch) => {
    const blog = await blogService.create({
      title, 
      author, 
      url,
    })
    dispatch({
      type: 'BLOG_CREATED',
      blog,
    })
  }
}

export const loadBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'BLOGS_LOADED',
      blogs,
    })
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    if (window.confirm(`Really delete ${blog.title} by ${blog.author}?`)) {
      await blogService.deleteBlog(blog)
      dispatch({
        type: 'DELETE_BLOG',
        blog,
      })
    }  
  }
}

export const addLike = (blog) => {
  return async (dispatch) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    await blogService.update(updatedBlog)
    dispatch({
      type: 'BLOG_UPDATED',
      blog: updatedBlog,
    })  
  }
}

export default { loadBlogs, addBlog, addLike }
