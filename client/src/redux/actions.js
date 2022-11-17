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
  CHECK_PROFILE,
  OPEN_NAV,
  CLOSE_NAV,
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  CREATE_REVIEW,
  LOAD_PRODUCTS_BY_RECOMMENDATIONS,
  LOAD_PRODUCTS_BY_RELATIONS,
  LOAD_PRODUCTS_BY_SALE,
  SET_CURRENCY,
  CHAT_MESSAGE,
  CHAT_CONNECT,
  CHAT_DISCONNECT, LOAD_PRODUCTS_BY_SEARCH
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

import {api_url} from "../config";

export const increaseCart = (product) => ({
  type: INCREASE_CART,
  product
});

export const decreaseCart = (id) => ({
  type: DECREASE_CART,
  id
});

export const removeFromCart = (id) => ({
  type: REMOVE_FROM_CART,
  id
});

export const processCheckout = () => async (dispatch) => {
  await dispatch({type: PROCESS_CHECKOUT});
  dispatch(push(BASKET_ROUTE_CHECKOUT));
};


const _makeOrder = (values, products, token) => ({
  type: MAKE_ORDER,
  CallApi: `${api_url}api/order`,
  values: {...values, products},
  token
});

export const makeOrder = (values) => async (dispatch, getState) => {
  const state = getState();
  const products = orderSelector(state);
  const token = tokenSelector(state);

  await dispatch(_makeOrder(values, products, token));
  dispatch(replace(BASKET_ROUTE_COMPLETED));
};


export const _setActiveCategory = (subcategoryId, categoryId) => ({
  type: SET_ACTIVE_CATEGORIES,
  subcategoryId,
  categoryId
});

export const loadCategories = () => ({
  type: LOAD_CATEGORIES,
  CallApi: `${api_url}api/categories`
});

export const loadBrands = () => ({
  type: LOAD_BRANDS,
  CallApi: `${api_url}api/brands`
});


export const changeProductPageLocation = (attr, param) => async (dispatch, getState) => {
  const state = getState();
  const query = queryParamsSelector(state);
  const searchParams = {...query, [attr]: param};

  if (searchParams.filters) searchParams.filters = decodeURIComponent(searchParams.filters);

  dispatch(push(`${window.location.pathname}?${new URLSearchParams({...searchParams})}`));
};

export const loadProductsList = (page, limit, sort, filters) => {
  const searchParams = {};
  if (page) searchParams.page = page;
  if (limit) searchParams.limit = limit;
  if (sort) searchParams.sort = sort;

  return {
    type: LOAD_PRODUCTS,
    CallApi: `${api_url}api/products?${new URLSearchParams({...searchParams, ...filters})}`,
  };
};


const _loadProductsByCategory = (searchParams, subcategoryId) => ({
  type: LOAD_PRODUCTS,
  CallApi: `${api_url}api/products?${new URLSearchParams({...searchParams, subcategoryId})}`,
  subcategoryId
});

export const loadProductsByCategory = (page, limit, sort, filters, subcategoryId) => async (dispatch, getState) => {
  let state = getState();
  const categoryId = activeCategoryBySubcategorySelector(state, {subcategoryId});

  const searchParams = {};
  if (page) searchParams.page = page;
  if (limit) searchParams.limit = limit;
  if (sort) searchParams.sort = sort;
  if (subcategoryId) searchParams.subcategoryId = subcategoryId;

  try {
    await dispatch(_loadProductsByCategory({...searchParams, ...filters}, subcategoryId));

    dispatch(_setActiveCategory(subcategoryId, categoryId));
  } catch (e) {
    dispatch(replace(ERROR_ROUTE));
  }
};


const _loadProductsBySearch = (query) => ({
  type: LOAD_PRODUCTS_BY_SEARCH,
  CallApi: `${api_url}api/search?query=${query}`,
});

export const loadProductsBySearch = () => async (dispatch, getState) => {
  const state = getState();
  const loading = loadingSearchSelector(state);
  const query = queryParamsSelector(state).query;

  if (!query) return dispatch(replace(HOME_ROUTE));
  if (!loading) dispatch(_loadProductsBySearch(query));
};


const _loadRecommendations = () => ({
  type: LOAD_PRODUCTS_BY_RECOMMENDATIONS,
  CallApi: `${api_url}api/recommendations`
});

export const loadRecommendations = () => async (dispatch, getState) => {
  const state = getState();
  const loading = loadingRecommendationsSelector(state);
  const loaded = loadedRecommendationsSelector(state);

  if (!loading && !loaded) dispatch(_loadRecommendations());
};


export const loadRelations = (subcategoryId) => ({
  type: LOAD_PRODUCTS_BY_RELATIONS,
  CallApi: `${api_url}api/relations?subcategoryId=${subcategoryId}`
});


const _loadSale = () => ({
  type: LOAD_PRODUCTS_BY_SALE,
  CallApi: `${api_url}api/sale`
});

export const loadSale = () => async (dispatch, getState) => {
  const state = getState();
  const loading = loadingSaleSelector(state);
  const loaded = loadedSaleSelector(state);

  if (!loading && !loaded) dispatch(_loadSale());
};


const _loadProduct = (id) => ({
  type: LOAD_PRODUCT,
  CallApi: `${api_url}api/product/${id}`,
  id
});

export const loadProduct = (id) => async (dispatch, getState) => {
  let state = getState();
  const products = productsSelector(state);

  if (!products[id]) {
    try {
      await dispatch(_loadProduct(id));
    } catch {
      dispatch(replace(ERROR_ROUTE));
    }
  }

  state = getState();

  const subcategoryId = activeSubCategoryByProductSelector(state, {id});
  const categoryId = activeCategoryBySubcategorySelector(state, {subcategoryId});

  if (categoryId) await dispatch(_setActiveCategory(subcategoryId, categoryId));
};


const _loadReviews = (productId) => ({
  type: LOAD_REVIEWS,
  CallApi: `${api_url}api/reviews?id=${productId}`,
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


const _addReview = (values, productId) => ({
  type: ADD_REVIEW,
  productId,
  values: {...values, productId}
});

//// FOR REAL REVIEW CREATION IN DB!
// const _createReview = (values, productId) => ({
//   type: CREATE_REVIEW,
//   CallApi: '/api/reviews',
//   productId,
//   values: {...values, productId}
// });


export const createReview = (values, productId) => async (dispatch) => {
  await dispatch(_addReview(values, productId));
  //// FOR REAL REVIEW CREATION IN DB!
  // const {id, date, ...rest} = values;
  //
  // dispatch(_createReview(rest, productId,));
};


const _login = (values) => ({
  type: LOGIN,
  CallApi: `${api_url}api/login`,
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
  CallApi: `${api_url}api/oauth/${provider}`
});

export const oauthCallback = (provider, code) => ({
  type: OAUTH_CALLBACK,
  CallApi: `${api_url}api/oauth_callback/?code=${code}`,
  values: {provider}
});


const _register = (values) => ({
  type: REGISTER,
  CallApi: `${api_url}api/register`,
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
  CallApi: `${api_url}api/confirm`,
  values: {verificationToken}
});


const _checkProfile = () => ({
  type: CHECK_PROFILE
});

const _fetchProfile = (token) => ({
  type: FETCH_PROFILE,
  CallApi: `${api_url}api/me`,
  token
});

export const fetchProfile = () => async (dispatch, getState) => {
  const state = getState();
  const fetching = fetchingProfileSelector(state);
  const token = tokenSelector(state);

  if (!fetching && token) {
    await dispatch(_fetchProfile(token));
  }

  dispatch(_checkProfile())
};


export const openNav = () => ({
  type: OPEN_NAV
});

export const closeNav = () => ({
  type: CLOSE_NAV
});


const _createProduct = (values, id, images, specification, saleImages, token) => ({
  type: CREATE_PRODUCT,
  CallApi: `${api_url}api/product`,
  values: {...values, slug: id, images, specification, saleImages},
  id,
  token
});

export const createProduct = (values, id, images, specification, saleImages) => async (dispatch, getState) => {
  const state = getState();
  const token = tokenSelector(state);

  await dispatch(_createProduct(values, id, images, specification, saleImages, token));
  await dispatch(push(ADMIN_ROUTE));

  window.location.reload();
};


const _updateProduct = (values, id, images, specification, saleImages, token) => ({
  type: UPDATE_PRODUCT,
  CallApi: `${api_url}api/product/${id}`,
  values: {...values, slug: id, images, specification, saleImages},
  id,
  method: 'PUT',
  token
});

export const updateProduct = (values, id, images, specification, saleImages) => async (dispatch, getState) => {
  const state = getState();
  const token = tokenSelector(state);

  await dispatch(_updateProduct(values, id, images, specification, saleImages, token));
  await dispatch(push(ADMIN_ROUTE));

  window.location.reload();
};


const _deleteProduct = (id, token) => ({
  type: DELETE_PRODUCT,
  CallApi: `${api_url}api/product/${id}`,
  method: 'DELETE',
  id,
  token
});

export const deleteProduct = (id) => async (dispatch, getState) => {
  const state = getState();
  const token = tokenSelector(state);

  await dispatch(_deleteProduct(id, token));

  window.location.reload();
};


export const setCurrency = (currency) => ({
  type: SET_CURRENCY,
  currency
});


export const chatMessage = (msg) => ({
  type: CHAT_MESSAGE,
  msg
});

export const chatConnect = () => ({
  type: CHAT_CONNECT
});

export const chatDisconnect = () => ({
  type: CHAT_DISCONNECT
});
