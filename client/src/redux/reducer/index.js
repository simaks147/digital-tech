import {combineReducers} from 'redux';
import { connectRouter } from 'connected-react-router'
import categories from "./categories";
import products from "./products";
import order from "./order";

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  categories,
  products,
  order
});

export default createRootReducer;
