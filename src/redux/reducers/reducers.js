import { combineReducers } from 'redux';

const userDetailsReducer = (state = { isLogged: false }, action) => {
  switch (action.type) {
    case 'CREATE_USER'://signup
      return {
        ...state,
        username: action.payload.username,
        email: action.payload.email,
        isLogged: true
      };
    case 'SIGN_IN':
      return {
        ...state,
        username: action.payload.username,
        email: action.payload.email,
        projects: [],
        isLogged: true
      };
    case 'LOG_OUT':
      return {
        isLogged: false
      }
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