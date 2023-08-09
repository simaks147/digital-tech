import {
  BASKET_ROUTE,
  BASKET_ROUTE_SHOPPING,
  BASKET_ROUTE_CHECKOUT,
  BASKET_ROUTE_COMPLETED,
  HOME_ROUTE,
  ERROR_ROUTE,
  SEARCH_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  CONFIRM_ROUTE,
  CATEGORY_ROUTE,
  PRODUCT_ROUTE,
  OAUTH_CALLBACK_ROUTE,
  ADMIN_ROUTE,
  ADMIN_PRODUCT_ROUTE
} from "./utils/consts";
import BasketPage from "./pages/BasketPage";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import OauthCallbackPage from "./pages/OauthCallbackPage";
import RegisterPage from "./pages/RegisterPage";
import ConfirmPage from "./pages/ConfirmPage";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import SearchPage from "./pages/SearchPage";
import AdminProductCreationPage from "./pages/AdminProductCreationPage";
import AdminProductUpdatePage from "./pages/AdminProductUpdatePage";
import AdminProductsListPage from "./pages/AdminProductsListPage";
import { ComponentType } from "react";

interface IRoute {
  path: string | string[],
  Component: ComponentType
}

export const adminRoutes: IRoute[] = [
  {
    path: ADMIN_ROUTE,
    Component: AdminProductsListPage
  },
  {
    path: ADMIN_PRODUCT_ROUTE,
    Component: AdminProductCreationPage
  },
  {
    path: ADMIN_PRODUCT_ROUTE + '/:slug',
    Component: AdminProductUpdatePage
  }
];

export const privateRoutes = [
  {
    path: [
      BASKET_ROUTE_CHECKOUT,
      BASKET_ROUTE_COMPLETED
    ],
    Component: BasketPage
  }
];

export const publicRoutes = [
  {
    path: HOME_ROUTE,
    Component: HomePage
  },
  {
    path: ERROR_ROUTE,
    Component: ErrorPage
  },
  {
    path: LOGIN_ROUTE,
    Component: LoginPage
  },
  {
    path: OAUTH_CALLBACK_ROUTE,
    Component: OauthCallbackPage
  },
  {
    path: REGISTER_ROUTE,
    Component: RegisterPage
  },
  {
    path: CONFIRM_ROUTE,
    Component: ConfirmPage
  },
  {
    path: SEARCH_ROUTE,
    Component: SearchPage
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
  {
    path: [
      BASKET_ROUTE,
      BASKET_ROUTE_SHOPPING
    ],
    Component: BasketPage
  }
];

