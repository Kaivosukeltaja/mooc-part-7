const initialState = {
  currentUser: null,
  users: [],
}

export default (state = initialState, action) => {
  switch(action.type) {
  case 'LOGOUT':
    return { ...state, currentUser: null }
  case 'LOGGED_IN':
  case 'AUTOLOGIN':
    return { ...state, currentUser: action.user }
  case 'USERS_LOADED':
    return { ...state, users: action.users }
  default:
    return state
  }
}
