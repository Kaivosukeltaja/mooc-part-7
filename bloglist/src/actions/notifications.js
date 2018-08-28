export const showNotification = (text, error = false) => {
  return (dispatch) => {
    const notification = {
      id: Date.now(),
      text,
      error,
    }
    dispatch({
      type: 'SHOW_NOTIFICATION',
      notification,
    })
    setTimeout(() => {
      dispatch({
        type: 'HIDE_NOTIFICATION',
        notification,
      })
    }, 5000)
  }
}
