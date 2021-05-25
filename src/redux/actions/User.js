import * as api from '../../api/index';

export const createUser = (userData) => async (dispatch) => {
  try {
    const res = await api.createUser(userData);
    dispatch({ type: 'CREATE_USER', payload: res.data });
  } catch (error) {
    console.error(error);
  }
}