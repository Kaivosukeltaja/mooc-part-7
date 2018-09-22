const initialState = {
  notifications: [],
}

export default (state = initialState, action) => {
  switch(action.type) {
  case 'SHOW_NOTIFICATION':
    return { ...state, notifications: [ ...state.notifications, action.notification ]}
  case 'HIDE_NOTIFICATION':
    return { 
      ...state, 
      notifications: state.notifications.filter((notification) => notification.id !== action.notification.id)
    }
  default:
    return state
  }
}
