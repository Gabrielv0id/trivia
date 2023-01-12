import { composeWithDevTools } from '@redux-devtools/extension/';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import playerReducer from './reducers';

const rootReducer = combineReducers({
  player: playerReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

if (window.Cypress) {
  window.store = store;
}

export default store;
