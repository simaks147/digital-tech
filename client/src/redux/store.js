import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from './reducer';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export default createStore(createRootReducer(history), composeWithDevTools(applyMiddleware(
  routerMiddleware(history),
)));