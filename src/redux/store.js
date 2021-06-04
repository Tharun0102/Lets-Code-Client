import { createStore, applyMiddleware, compose } from 'redux';
import Reducers from './reducers/reducers';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

export const store = createStore(
  Reducers,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export const persistor = persistStore(store);