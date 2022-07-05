import {
  BASKET_ROUTE,
  BASKET_ROUTE_SHOPPING,
  BASKET_ROUTE_CHECKOUT,
  BASKET_ROUTE_COMPLETED,
  HOME_ROUTE,
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
import LoginPage from "./pages/LoginPage";
import OauthCallbackPage from "./pages/OauthCallbackPage";
import RegisterPage from "./pages/RegisterPage";
import ConfirmPage from "./pages/ConfirmPage";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import AdminProductCreationPage from "./pages/AdminProductCreationPage";
import AdminProductUpdatePage from "./pages/AdminProductUpdatePage";
import AdminProductsListPage from "./pages/AdminProductsListPage";

const routes = [
  {
    path: HOME_ROUTE,
    Component: HomePage
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
      BASKET_ROUTE_SHOPPING,
      BASKET_ROUTE_CHECKOUT,
      BASKET_ROUTE_COMPLETED
    ],
    Component: BasketPage
  },
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

export default routes;

