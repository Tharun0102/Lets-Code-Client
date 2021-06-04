import * as api from '../../api/index';

export const createUser = (userData) => async (dispatch) => {
  try {
    const res = await api.createUser(userData);
    dispatch({ type: 'SIGN_IN', payload: res.data });
  } catch (error) {
    console.error(error);
  }
}
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
export const DELETE_PROJECT = (data) => {
  return {
    type: 'DELETE_PROJECT',
    payload: data
  }
}