import { createStore, combineReducers, applyMiddleware } from "redux";
import taskReducer from "./Tasks/taskReducer";
import thunk from "redux-thunk";
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
import { composeWithDevTools } from "redux-devtools-extension";
const rootReducer = combineReducers({
  taskReducer: taskReducer,
});

const configureStore = () => createStore(rootReducer, applyMiddleware(thunk));
// createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default configureStore;
