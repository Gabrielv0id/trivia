import { composeWithDevTools } from '@redux-devtools/extension/';
import { combineReducers, createStore } from 'redux';
import playerReducer from './reducers';

const rootReducer = combineReducers({
  player: playerReducer,
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;
