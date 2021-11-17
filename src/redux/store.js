import { createStore, compose } from 'redux';
import Reducers from './reducers/reducers';
import { persistStore } from 'redux-persist';

export const store = createStore(
  Reducers,
  compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export const persistor = persistStore(store);