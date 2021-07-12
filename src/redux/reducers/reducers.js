import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const userDetailsReducer = (state = { isLogged: false }, action) => {
  let updated = state;
  switch (action.type) {
    case 'SIGN_IN':
      console.log(action.payload);
      updated = {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        id: action.payload._id,
        projects: [],
        isLogged: true
      };
      return updated;
    case 'LOG_OUT':
      return {
        isLogged: false
      };
    case 'INIT_PROJECTS':
      updated = {
        ...state,
        projects: action.payload
      }
      return updated;
    case 'ADD_PROJECT':
      updated = {
        ...state,
        projects: [...state.projects, action.payload]
      }
      return updated;
    case 'DELETE_PROJECT':
      updated = state.projects.filter(p => (p !== null && p._id != action.payload._id));
      return {
        ...state,
        projects: updated
      }
    case 'STAR':
      updated = state.projects.map((p) => {
        if (p._id == action.payload._id) {
          p.isFav = !p.isFav;
          console.log(p.isFav);
        }
        return p;
      })
      return {
        ...state,
        projects: updated
      }
    default:
      return state;
  }
}
const activeStateReducer = (state = { projectId: '', fileId: '', runButton: false }, action) => {
  switch (action.type) {
    case 'SET_PROJECT':
      return { ...state, projectId: action.payload._id };
    case 'SET_FILE':
      return { ...state, fileId: action.payload._id };
    case 'SET_BUTTON':
      return { ...state, runButton: true }
    default:
      return state;
  }
}

const persistConfig = {
  key: 'root',
  storage,
  whiltelist: ['userDetails', 'active', 'activeState']
}


const rootReducer = combineReducers({
  userDetails: userDetailsReducer,
  active: activeStateReducer
});

export default persistReducer(persistConfig, rootReducer);