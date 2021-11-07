export const INIT_PROJECTS = (data) => {
  return {
    type: 'INIT_PROJECTS',
    payload: data
  }
}
export const ADD_PROJECT = (data) => {
  return {
    type: 'ADD_PROJECT',
    payload: data
  }
}
export const DELETE_PROJECT = (id) => {
  return {
    type: 'DELETE_PROJECT',
    payload: { _id: id }
  }
}
export const SET_PROJECT = (id) => {
  return {
    type: 'SET_PROJECT',
    payload: { _id: id }
  }
}