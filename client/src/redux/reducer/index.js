import {combineReducers} from 'redux';
import { connectRouter } from 'connected-react-router'
import categories from "./categories";
import brands from "./brands";
import products from "./products";
import order from "./order";
import reviews from "./reviews";
import auth from "./auth";
import nav from "./nav";

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  categories,
  brands,
  products,
  order,
  reviews,
  auth,
  nav
});

export default createRootReducer;
