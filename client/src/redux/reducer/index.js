import {combineReducers} from 'redux';
import { connectRouter } from 'connected-react-router'
import categories from "./categories";
import products from "./products";
import order from "./order";
import subcategories from "./subcategories";
import reviews from "./reviews";
import auth from "./auth";

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  categories,
  products,
  order,
  subcategories,
  reviews,
  auth
});

export default createRootReducer;
