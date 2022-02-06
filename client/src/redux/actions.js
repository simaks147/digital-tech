import {
  INCREASE_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  MAKE_ORDER,
  LOAD_CATEGORIES,
  LOAD_PRODUCTS,
  LOAD_PRODUCT
} from "./consts";

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

export const makeOrder = () => ({
  type: MAKE_ORDER,
});

export const loadCategories = () => ({
  type: LOAD_CATEGORIES,
  CallApi: '/api/categories'
});

export const loadProducts = (categoryId) => ({
  type: LOAD_PRODUCTS,
  CallApi: `/api/products?categoryId=${categoryId}`,
  categoryId
});

export const loadProduct = (id) => ({
  type: LOAD_PRODUCT,
  CallApi: `/api/product?id=${id}`,
  id
});
