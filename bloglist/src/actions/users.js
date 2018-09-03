import blogService from '../services/blogs'
import userService from '../services/users'
import loginService from '../services/login'
import { showNotification } from './notifications'

export const loadUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch({
      type: 'USERS_LOADED',
      users,
    })
  }
}

export const initUser = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('currentUser')
    if (loggedUserJSON) {
      const currentUser = JSON.parse(loggedUserJSON)
      blogService.setToken(currentUser.token)
      dispatch({
        type: 'AUTOLOGIN',
        user: currentUser,
      })
    }
  }
}

export const logout = () => {
  return async (dispatch) => {
    blogService.setToken(null)
    await window.localStorage.clear()
    dispatch({ type: 'LOGOUT' })
  }
}

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const result = await loginService.doLogin({
        username,
        password,
      })
      blogService.setToken(result.token)
      window.localStorage.setItem('currentUser', JSON.stringify(result))
      dispatch({
        type: 'LOGGED_IN',
        user: result,
      })
    } catch (error) {
      dispatch(showNotification('Your username or password is invalid!', true))
    }
  }
}

export default { logout, login }
