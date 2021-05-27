import { combineReducers } from 'redux';

const userDetailsReducer = (state = { isLogged: false }, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      const user = {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        id: action.payload._id,
        projects: [],
        isLogged: true
      };
      return user;
    case 'LOG_OUT':
      return {
        isLogged: false
      };
    default:
      return state;
  }
}

const projectDetailsReducer = (state = [], action) => {
  console.log("state", state);
  switch (action.type) {
    case 'ADD_PROJECT':
      const newProject = {
        id: action.id,
        name: action.name,
        fileList: []
      };
      state.push(newProject);
      return state;
    case 'STAR':
      const id = action.id;
      const index = state.findIndex(e => e.id === id);
      state[index].starred = true;
      return state;
    default:
      return state;
  }
}


const allReducers = combineReducers(
  { userDetails: userDetailsReducer },
  { projectDetails: projectDetailsReducer }

);

export default allReducers;