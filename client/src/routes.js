import {
  BASKET_ROUTE,
  BASKET_ROUTE_SHOPPING,
  BASKET_ROUTE_CHECKOUT,
  BASKET_ROUTE_COMPLETED,
  HOME_ROUTE, LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  CATEGORY_ROUTE,
  PRODUCT_ROUTE
} from "./utils/consts";
import BasketPage from "./pages/BasketPage";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";

export const authRoutes = [
  {
    path: [
      BASKET_ROUTE,
      BASKET_ROUTE_SHOPPING,
      BASKET_ROUTE_CHECKOUT,
      BASKET_ROUTE_COMPLETED
    ],
    Component: BasketPage
  }
]

export const publicRoutes = [
  {

    path: HOME_ROUTE,
    Component: HomePage
  },
  {
    path: LOGIN_ROUTE,
    Component: AuthPage
  },
  {
    path: REGISTRATION_ROUTE,
    Component: AuthPage
  },
  {
    path: [
      CATEGORY_ROUTE,
      CATEGORY_ROUTE + '/:slug'
    ],
    Component: CategoryPage
  },
  {
    path: [
      PRODUCT_ROUTE,
      PRODUCT_ROUTE + '/:slug'
    ],
    Component: ProductPage
  },
]

