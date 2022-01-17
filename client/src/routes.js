import {BASKET_ROUTE, HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, CATEGORY_ROUTE, PRODUCT_ROUTE} from "./utils/consts";
import Basket from "./pages/Basket";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Category from "./pages/Category";
import Product from "./pages/Product";

export const authRoutes = [
  {
    path: BASKET_ROUTE,
    Component: Basket
  }
]

export const publicRoutes = [
  {

    path: HOME_ROUTE,
    Component: Home
  },
  {
    path: LOGIN_ROUTE,
    Component: Auth
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth
  },
  {
    path: CATEGORY_ROUTE + '/:title',
    Component: Category
  },
  {
    path: PRODUCT_ROUTE + '/:id',
    Component: Product
  },
]

