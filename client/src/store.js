import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk"; //something to do with allowing us to use dispatch in action creators without specifically importing thunk in every file
import rootReducer from "./reducers"; //This gets the combined reducers from index.js in reducers folder

const initialState = {
  errors: {}
};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
