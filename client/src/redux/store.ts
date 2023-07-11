import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from './reducer';
import { createBrowserHistory } from 'history';
import api from './middleware/api';
import thunk from "redux-thunk";

export const history = createBrowserHistory();

export default createStore(createRootReducer(history), composeWithDevTools(applyMiddleware(
  thunk,
  routerMiddleware(history),
  api
)));
