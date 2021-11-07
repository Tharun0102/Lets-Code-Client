export const updateUser = (userData) => {
  return {
    type: 'UPDATE',
    payload: userData
  }
}
export const LOGOUT = () => {
  return {
    type: 'LOG_OUT'
  }
}