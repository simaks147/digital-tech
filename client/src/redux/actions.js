import {push} from "connected-react-router";

import {
  INCREASE_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  MAKE_ORDER,
  LOAD_CATEGORIES,
  LOAD_PRODUCTS,
  LOAD_PRODUCT,
  SET_ACTIVE_CATEGORIES,
  PROCESS_CHECKOUT,
  LOAD_REVIEWS
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
  // loadingReviewsSelector,
  // loadedReviewsSelector
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

export const makeOrder = () => async (dispatch, getState) => {
  await dispatch({type: MAKE_ORDER});
  dispatch(push(BASKET_ROUTE_COMPLETED))
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
}

const _loadProduct = (id) => ({
  type: LOAD_PRODUCT,
  CallApi: `/api/product?id=${id}`,
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
}

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
}
