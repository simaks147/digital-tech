import {push, replace} from "connected-react-router";

import {
  INCREASE_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  MAKE_ORDER,
  LOAD_CATEGORIES,
  LOAD_BRANDS,
  LOAD_PRODUCTS,
  LOAD_PRODUCT,
  SET_ACTIVE_CATEGORIES,
  PROCESS_CHECKOUT,
  LOAD_REVIEWS,
  ADD_REVIEW,
  LOGIN,
  OAUTH,
  OAUTH_CALLBACK,
  REGISTER,
  CONFIRM,
  FETCH_PROFILE,
  OPEN_NAV,
  CLOSE_NAV
} from "./consts";

import {
  BASKET_ROUTE_CHECKOUT,
  BASKET_ROUTE_COMPLETED
} from "../utils/consts";

import {
  activeCategoryBySubcategorySelector,
  activeSubCategoryByProductSelector,
  loadingProductsSelector,
  loadedProductsSelector,
  subcategoriesSelector,
  loginSelector,
  registrationSelector,
  profileSelector,
  tokenSelector,
  orderSelector,
} from "./selectors";

export const increaseCart = (id) => ({
  type: INCREASE_CART,
  id
});

export const decreaseCart = (id) => ({
  type: DECREASE_CART,
  id
});

export const removeFromCart = (id) => ({
  type: REMOVE_FROM_CART,
  id
});

export const processCheckout = () => async (dispatch, getState) => {
  await dispatch({type: PROCESS_CHECKOUT});
  dispatch(push(BASKET_ROUTE_CHECKOUT))
};

const _makeOrder = (values, products, token) => ({
  type: MAKE_ORDER,
  CallApi: '/api/order',
  values: {...values, products},
  token
});

export const makeOrder = (values) => async (dispatch, getState) => {
  const state = getState();
  const products = orderSelector(state);
  const token = tokenSelector(state);

  try {
    await dispatch(_makeOrder(values, products, token));
    dispatch(replace(BASKET_ROUTE_COMPLETED));
  } catch {}
};

export const _setActiveCategory = (subcategoryId, categoryId) => ({
  type: SET_ACTIVE_CATEGORIES,
  subcategoryId,
  categoryId
});

export const loadCategories = () => ({
  type: LOAD_CATEGORIES,
  CallApi: '/api/categories'
});

export const loadBrands = () => ({
  type: LOAD_BRANDS,
  CallApi: '/api/brands'
});

const _loadProducts = (id) => ({
  type: LOAD_PRODUCTS,
  CallApi: `/api/products?subcategoryId=${id}`,
  id
});

export const loadProducts = (subcategoryId) => async (dispatch, getState) => {
  let state = getState();
  const subcategories = subcategoriesSelector(state);
  const categoryId = activeCategoryBySubcategorySelector(state, {subcategoryId});


  if (!subcategories[subcategoryId]) {
    await dispatch(_loadProducts(subcategoryId));
  }

  await dispatch(_setActiveCategory(subcategoryId, categoryId));
};

const _loadProduct = (id) => ({
  type: LOAD_PRODUCT,
  CallApi: `/api/product/${id}`,
  id
});

export const loadProduct = (id) => async (dispatch, getState) => {
  let state = getState();
  const loading = loadingProductsSelector(state);
  const loaded = loadedProductsSelector(state);

  if (!loading && !loaded) {
    await dispatch(_loadProduct(id));
  }

  state = getState();

  const subcategoryId = activeSubCategoryByProductSelector(state, {id});
  const categoryId = activeCategoryBySubcategorySelector(state, {subcategoryId});

  await dispatch(_setActiveCategory(subcategoryId, categoryId));
};

const _loadReviews = (productId) => ({
  type: LOAD_REVIEWS,
  CallApi: `/api/reviews?productId=${productId}`,
  productId
});

export const loadReviews = (productId) => async (dispatch, getState) => {
  let state = getState();
  const loading = state.reviews[productId]?.loading;
  const loaded = state.reviews[productId]?.loaded;

  if (!loading && !loaded) {
    await dispatch(_loadReviews(productId));
  }
};

export const addReview = (productId, values) => ({
  type: ADD_REVIEW,
  productId,
  values
});

const _login = (values) => ({
  type: LOGIN,
  CallApi: '/api/login',
  values
});

export const login = (values) => async (dispatch, getState) => {
  let state = getState();
  let login = loginSelector(state);
  const processing = login.processing;

  if (!processing) {
    await dispatch(_login(values));
  }
};

export const oauth = (provider) => ({
  type: OAUTH,
  CallApi: `/api/oauth/${provider}`
});

export const oauthCallback = (provider, code) => ({
  type: OAUTH_CALLBACK,
  CallApi: `/api/oauth_callback/?code=${code}`,
  values: {provider}
});

const _register = (values) => ({
  type: REGISTER,
  CallApi: '/api/register',
  values
});

export const register = (values) => async (dispatch, getState) => {
  let state = getState();
  let registration = registrationSelector(state);
  const processing = registration.processing;

  if (!processing) {
    await dispatch(_register(values));
  }
};

export const confirm = (verificationToken) => ({
  type: CONFIRM,
  CallApi: '/api/confirm',
  values: {verificationToken}
});

const _fetchProfile = (token) => ({
  type: FETCH_PROFILE,
  CallApi: '/api/me',
  token
});

export const fetchProfile = () => async (dispatch, getState) => {
  const state = getState();
  const profile = profileSelector(state);
  const token = tokenSelector(state);
  const fetching = profile.fetching;

  if (!fetching) {
    await dispatch(_fetchProfile(token));
  }
};

export const openNav = () => ({
  type: OPEN_NAV
});

export const closeNav = () => ({
  type: CLOSE_NAV
});
