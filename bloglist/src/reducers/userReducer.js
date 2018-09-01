const initialState = {
  currentUser: null,
}

export default (state = initialState, action) => {
  switch(action.type) {
  case 'LOGOUT':
    return initialState
  case 'LOGGED_IN':
  case 'AUTOLOGIN':
    return { currentUser: action.user }
  default:
    return state
  }
}
