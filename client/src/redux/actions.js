import {
  INCREASE_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  MAKE_ORDER,
  LOAD_CATEGORIES,
  LOAD_PRODUCTS,
  LOAD_PRODUCT,
  SET_ACTIVE_CATEGORIES, PROCESS_CHECKOUT
} from "./consts";
import {
  activeCategoryBySubcategorySelector,
  activeSubCategoryByProductSelector,
  loadingProductsSelector,
  loadedProductsSelector,
  subcategoriesSelector,
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

export const processCheckout = () => ({
  type: PROCESS_CHECKOUT,
  activeBasketView: 'Checkout'
});

export const makeOrder = () => ({
  type: MAKE_ORDER,
  activeBasketView: 'Completed'
});

export const _setActiveCategory = (subcategoryId, categoryId) => ({
  type: SET_ACTIVE_CATEGORIES,
  subcategoryId,
  categoryId
});

export const loadCategories = () => ({
  type: LOAD_CATEGORIES,
  CallApi: '/api/categories'
});

export const _loadProducts = (id) => ({
  type: LOAD_PRODUCTS,
  CallApi: `/api/products?subcategoryId=${id}`,
  id
});

export const _loadProduct = (id) => ({
  type: LOAD_PRODUCT,
  CallApi: `/api/product?id=${id}`,
  id
});

export const loadProducts = (id) => async (dispatch, getState) => {
  let state = getState();
  const subcategories = subcategoriesSelector(state);
  const categoryId = activeCategoryBySubcategorySelector(state, {id});


  if (!subcategories[id]) {
    await dispatch(_loadProducts(id));
  }

  await dispatch(_setActiveCategory(id, categoryId));
}

export const loadProduct = (id) => async (dispatch, getState) => {
  let state = getState();
  const loading = loadingProductsSelector(state);
  const loaded = loadedProductsSelector(state);

  if (!loading && !loaded) {
    await dispatch(_loadProduct(id));
  }

  state = getState();

  const subcategoryId = activeSubCategoryByProductSelector(state, {id});
  const categoryId = activeCategoryBySubcategorySelector(state, subcategoryId);

  await dispatch(_setActiveCategory(subcategoryId, categoryId));
}
