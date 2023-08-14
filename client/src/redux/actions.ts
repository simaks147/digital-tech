import { push, replace } from "connected-react-router";
import { api_url } from "../config";
import { AsyncActionType, TokenType } from "./types/common";
import { ordersActions, orderActionType, IOrderProducts } from "./types/order";
import { IProduct, productsActionType, productsActions } from "./types/products";
import { categoriesActionType, categoriesActions } from "./types/categories";
import { brandsActionType, brandsActions } from "./types/brands";
import { IReview, reviewsActionType, reviewsActions } from "./types/reviews";
import { navActionType, navActions } from "./types/nav";
import { ICurrencyAction } from "./types/currencies";
import { IMessage, chatActionType, chatActions } from "./types/chat";
import { authActionType, authActions } from "./types/auth";

import {
  PROCESS_CHECKOUT,
  SET_CURRENCY
} from "./consts";

import {
  ADMIN_ROUTE,
  BASKET_ROUTE_CHECKOUT,
  BASKET_ROUTE_COMPLETED,
  ERROR_ROUTE,
  HOME_ROUTE
} from "../utils/consts";

import {
  activeCategoryBySubcategorySelector,
  activeSubCategoryByProductSelector,
  loginSelector,
  registrationSelector,
  fetchingProfileSelector,
  tokenSelector,
  orderSelector,
  productsSelector,
  queryParamsSelector,
  loadedRecommendationsSelector,
  loadingRecommendationsSelector,
  loadingSaleSelector,
  loadedSaleSelector,
  loadingSearchSelector
} from "./selectors";

export const increaseCart = (product: IProduct): orderActionType => ({
  type: ordersActions.INCREASE_CART,
  product
});

export const decreaseCart = (id: string): orderActionType => ({
  type: ordersActions.DECREASE_CART,
  id
});

export const removeFromCart = (id: string): orderActionType => ({
  type: ordersActions.REMOVE_FROM_CART,
  id
});

export const processCheckout = (): AsyncActionType => async (dispatch) => {
  await dispatch({ type: PROCESS_CHECKOUT });
  dispatch(push(BASKET_ROUTE_CHECKOUT));
};


const _makeOrder = (values: object, products: IOrderProducts, token: TokenType): orderActionType => ({
  type: ordersActions.MAKE_ORDER,
  CallApi: `${api_url}api/order`,
  values: { ...values, products },
  token
});

export const makeOrder = (values: object): AsyncActionType => async (dispatch, getState) => {
  const state = getState();
  const products = orderSelector(state);
  const token = tokenSelector(state);

  try {
    await dispatch(_makeOrder(values, products, token));
    dispatch(replace(BASKET_ROUTE_COMPLETED));
  } catch (e) {
    dispatch(replace(ERROR_ROUTE));
  }
};


export const _setActiveCategory = (subcategoryId: string, categoryId: string) => ({
  type: categoriesActions.SET_ACTIVE_CATEGORIES,
  subcategoryId,
  categoryId
});

export const loadCategories = (): categoriesActionType => ({
  type: categoriesActions.LOAD_CATEGORIES,
  CallApi: `${api_url}api/categories`
});

export const loadBrands = (): brandsActionType => ({
  type: brandsActions.LOAD_BRANDS,
  CallApi: `${api_url}api/brands`
});


export const changeProductPageLocation = (attr: string, param: string): AsyncActionType => async (dispatch, getState) => {
  const state = getState();
  const query = queryParamsSelector(state);
  const searchParams = { ...query, [attr]: param };

  if (searchParams.filters) searchParams.filters = decodeURIComponent(searchParams.filters);

  dispatch(push(`${window.location.pathname}?${new URLSearchParams({ ...searchParams })}`));
};

export const loadProductsList = (page: string, limit: string, sort: string, filters: Record<string, string>): productsActionType => {
  const searchParams: Record<string, string> = {};
  if (page) searchParams.page = page;
  if (limit) searchParams.limit = limit;
  if (sort) searchParams.sort = sort;

  return {
    type: productsActions.LOAD_PRODUCTS,
    CallApi: `${api_url}api/products?${new URLSearchParams({ ...searchParams, ...filters })}`,
  };
};


const _loadProductsByCategory = (searchParams: Record<string, string | number>, subcategoryId: string): productsActionType => ({
  type: productsActions.LOAD_PRODUCTS,
  CallApi: `${api_url}api/products?${new URLSearchParams({ ...searchParams, subcategoryId })}`
});

export const loadProductsByCategory = (
  page: number,
  limit: string,
  sort: string,
  filters: Record<string, any> | undefined,
  subcategoryId: string
): AsyncActionType => async (dispatch, getState) => {
  let state = getState();
  const categoryId = activeCategoryBySubcategorySelector(state, { subcategoryId });

  const searchParams: Record<string, string | number> = {};
  if (page) searchParams.page = page;
  if (limit) searchParams.limit = limit;
  if (sort) searchParams.sort = sort;
  if (subcategoryId) searchParams.subcategoryId = subcategoryId;

  try {
    await dispatch(_loadProductsByCategory({ ...searchParams, ...filters }, subcategoryId));
    dispatch(_setActiveCategory(subcategoryId, categoryId));
  } catch (e) {
    dispatch(replace(ERROR_ROUTE));
  }
};


const _loadProductsBySearch = (query: string): productsActionType => ({
  type: productsActions.LOAD_PRODUCTS_BY_SEARCH,
  CallApi: `${api_url}api/search?query=${query}`,
});

export const loadProductsBySearch = (): AsyncActionType => async (dispatch, getState) => {
  const state = getState();
  const loading = loadingSearchSelector(state);
  const query = queryParamsSelector(state).query;

  if (!query) return dispatch(replace(HOME_ROUTE));
  if (!loading) dispatch(_loadProductsBySearch(query));
};


const _loadRecommendations = (): productsActionType => ({
  type: productsActions.LOAD_PRODUCTS_BY_RECOMMENDATIONS,
  CallApi: `${api_url}api/recommendations`
});

export const loadRecommendations = (): AsyncActionType => async (dispatch, getState) => {
  const state = getState();
  const loading = loadingRecommendationsSelector(state);
  const loaded = loadedRecommendationsSelector(state);

  if (!loading && !loaded) dispatch(_loadRecommendations());
};


export const loadRelations = (subcategoryId: string): productsActionType => ({
  type: productsActions.LOAD_PRODUCTS_BY_RELATIONS,
  CallApi: `${api_url}api/relations?subcategoryId=${subcategoryId}`
});


const _loadSale = (): productsActionType => ({
  type: productsActions.LOAD_PRODUCTS_BY_SALE,
  CallApi: `${api_url}api/sale`
});

export const loadSale = (): AsyncActionType => async (dispatch, getState) => {
  const state = getState();
  const loading = loadingSaleSelector(state);
  const loaded = loadedSaleSelector(state);

  if (!loading && !loaded) dispatch(_loadSale());
};


const _loadProduct = (id: string): productsActionType => ({
  type: productsActions.LOAD_PRODUCT,
  CallApi: `${api_url}api/product/${id}`,
  id
});

export const loadProduct = (id: string): AsyncActionType => async (dispatch, getState) => {
  //// LOAD PRODUCT IT ABSENT IN REDUX STORE (BUG)
  // let state = getState();
  // const products = productsSelector(state);

  // if (!products[id]) {
  try {
    await dispatch(_loadProduct(id));
  } catch {
    dispatch(replace(ERROR_ROUTE));
  }
  // }

  const state = getState();

  const subcategoryId = activeSubCategoryByProductSelector(state, { id });
  const categoryId = activeCategoryBySubcategorySelector(state, { subcategoryId });

  if (categoryId) await dispatch(_setActiveCategory(subcategoryId, categoryId));
};


const _createProduct = (values: object, id: string, images: string[], specification: object[], saleImages: string[], token: TokenType): productsActionType => ({
  type: productsActions.CREATE_PRODUCT,
  CallApi: `${api_url}api/product`,
  values: { ...values, slug: id, images, specification, saleImages },
  id,
  token
});

export const createProduct = (values: object, id: string, images: string[], specification: object[], saleImages: string[]): AsyncActionType => async (dispatch, getState) => {
  const state = getState();
  const token = tokenSelector(state);

  await dispatch(_createProduct(values, id, images, specification, saleImages, token));
  await dispatch(push(ADMIN_ROUTE));

  window.location.reload();
};


const _updateProduct = (values: object, id: string, images: string[], specification: object[], saleImages: string[], token: TokenType): productsActionType => ({
  type: productsActions.UPDATE_PRODUCT,
  CallApi: `${api_url}api/product/${id}`,
  values: { ...values, slug: id, images, specification, saleImages },
  id,
  method: 'PUT',
  token
});

export const updateProduct = (values: object, id: string, images: string[], specification: object[], saleImages: string[]): AsyncActionType => async (dispatch, getState) => {
  const state = getState();
  const token = tokenSelector(state);

  await dispatch(_updateProduct(values, id, images, specification, saleImages, token));
  await dispatch(push(ADMIN_ROUTE));

  window.location.reload();
};


const _deleteProduct = (id: string, token: TokenType): productsActionType => ({
  type: productsActions.DELETE_PRODUCT,
  CallApi: `${api_url}api/product/${id}`,
  method: 'DELETE',
  id,
  token
});

export const deleteProduct = (id: string): AsyncActionType => async (dispatch, getState) => {
  const state = getState();
  const token = tokenSelector(state);

  await dispatch(_deleteProduct(id, token));

  window.location.reload();
};


const _loadReviews = (productId: string): reviewsActionType => ({
  type: reviewsActions.LOAD_REVIEWS,
  CallApi: `${api_url}api/reviews?id=${productId}`,
  productId
});

export const loadReviews = (productId: string): AsyncActionType => async (dispatch, getState) => {
  let state = getState();
  const loading = state.reviews[productId]?.loading;
  const loaded = state.reviews[productId]?.loaded;

  if (!loading && !loaded) {
    await dispatch(_loadReviews(productId));
  }
};


const _addReview = (values: Omit<IReview, 'productId'>, productId: string): reviewsActionType => ({
  type: reviewsActions.ADD_REVIEW,
  productId,
  values: { ...values, productId }
});

//// FOR REAL REVIEW CREATION IN DB!
// const _createReview = (values, productId) => ({
//   type: CREATE_REVIEW,
//   CallApi: '/api/reviews',
//   productId,
//   values: {...values, productId}
// });


export const createReview = (values: Omit<IReview, 'productId'>, productId: string): AsyncActionType => async (dispatch) => {
  await dispatch(_addReview(values, productId));
  //// FOR REAL REVIEW CREATION IN DB!
  // const {id, date, ...rest} = values;
  //
  // dispatch(_createReview(rest, productId,));
};


const _login = (values: object): authActionType => ({
  type: authActions.LOGIN,
  CallApi: `${api_url}api/login`,
  values
});

export const login = (values: object): AsyncActionType => async (dispatch, getState) => {
  let state = getState();
  let login = loginSelector(state);
  const processing = login.processing;

  if (!processing) {
    await dispatch(_login(values));
  }
};


export const oauth = (provider: string): authActionType => ({
  type: authActions.OAUTH,
  CallApi: `${api_url}api/oauth/${provider}`
});

export const oauthCallback = (provider: string, code: string): authActionType => ({
  type: authActions.OAUTH_CALLBACK,
  CallApi: `${api_url}api/oauth_callback/?code=${code}`,
  values: { provider }
});


const _register = (values: object): authActionType => ({
  type: authActions.REGISTER,
  CallApi: `${api_url}api/register`,
  values
});

export const register = (values: object): AsyncActionType => async (dispatch, getState) => {
  let state = getState();
  let registration = registrationSelector(state);
  const processing = registration.processing;

  if (!processing) {
    await dispatch(_register(values));
  }
};


export const confirm = (verificationToken: TokenType): authActionType => ({
  type: authActions.CONFIRM,
  CallApi: `${api_url}api/confirm`,
  values: { verificationToken }
});


const _checkProfile = (): authActionType => ({
  type: authActions.CHECK_PROFILE
});

const _fetchProfile = (token: TokenType): authActionType => ({
  type: authActions.FETCH_PROFILE,
  CallApi: `${api_url}api/me`,
  token
});

export const fetchProfile = (): AsyncActionType => async (dispatch, getState) => {
  const state = getState();
  const fetching = fetchingProfileSelector(state);
  const token = tokenSelector(state);

  if (!fetching && token) {
    await dispatch(_fetchProfile(token));
  }

  dispatch(_checkProfile())
};


export const openNav = (): navActionType => ({
  type: navActions.OPEN_NAV
});

export const closeNav = (): navActionType => ({
  type: navActions.CLOSE_NAV
});


export const setCurrency = (currency: string): ICurrencyAction => ({
  type: SET_CURRENCY,
  currency
});


export const chatMessage = (msg: IMessage): chatActionType => ({
  type: chatActions.CHAT_MESSAGE,
  msg
});

export const chatConnect = (): chatActionType => ({
  type: chatActions.CHAT_CONNECT
});

export const chatDisconnect = (): chatActionType => ({
  type: chatActions.CHAT_DISCONNECT
});
