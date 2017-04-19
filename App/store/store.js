/**
 * Created by Jonson.
 */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootRudcer';

let createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
let store = createStoreWithMiddleware(rootReducer);
// let state = store.getState();
// alert("111"+state.Search.searchText)
export default store;