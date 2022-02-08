import {combineReducers} from 'redux';
import { connectRouter } from 'connected-react-router'
import categories from "./categories";
import products from "./products";
import order from "./order";
import subcategories from "./subcategories";

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  categories,
  products,
  order,
  subcategories
});

export default createRootReducer;
