// import {compose, createStore, combineReducers, applyMiddleware} from 'redux';
// import thunk from 'redux-thunk';
// import authReducer from './reducers/authReducer';

// const rootReducer = combineReducers({
// auth: authReducer
// });

// let composeEnhancers = compose;

// const configureStore = () => createStore(rootReducer, applyMiddleware(thunk));

// export default configureStore;


import { createStore, applyMiddleware, combineReducers,compose } from "redux"
import thunk from "redux-thunk"
import authReducer from './reducers/authReducer';

const middleware = [thunk]
const rootReducer = combineReducers({
auth: authReducer
});
const composeEnhancers =
  typeof window === 'object' &&
  window.REDUX_DEVTOOLS_EXTENSION_COMPOSE ?
    window.REDUX_DEVTOOLS_EXTENSION_COMPOSE({}) : compose;
const enhancer = composeEnhancers(applyMiddleware(...middleware));
export const initStore = () => createStore(rootReducer, enhancer)


// export const initStore = () => createStore(rootReducer, compose(applyMiddleware(thunk)))
