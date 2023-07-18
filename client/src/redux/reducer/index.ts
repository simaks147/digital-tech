import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import categories from "./categories";
import brands from "./brands";
import products from "./products";
import order from "./order";
import reviews from "./reviews";
import auth from "./auth";
import nav from "./nav";
import currencies from "./currencies";
import chat from "./chat";

const createRootReducer = (history: History) => combineReducers({
  router: connectRouter(history),
  categories,
  brands,
  products,
  order,
  reviews,
  auth,
  nav,
  currencies,
  chat
});

export default createRootReducer;

export type RootStateType = ReturnType<typeof createRootReducer>;

