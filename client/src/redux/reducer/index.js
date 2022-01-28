import {combineReducers} from 'redux';
import { connectRouter } from 'connected-react-router'
import categories from "./categories";
import products from "./products";

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  categories,
  products
});

export default createRootReducer;
