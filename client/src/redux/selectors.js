import {createSelector} from "reselect";

export const categoriesSelector = (state) => state.categories.entities;
export const productsSelector = (state) => state.products.entities;
export const orderSelector = (state) => state.order;
export const subcategoriesSelector = (state) => state.subcategories;

export const loadingCategoriesSelector = (state) => state.categories.loading;
export const loadedCategoriesSelector = (state) => state.categories.loaded;

export const loadingProductsSelector = (state) => state.products.loading;
export const loadedProductsSelector = (state) => state.products.loaded;

export const productSelector = (state, {id}) => productsSelector(state)[id];


export const categoriesListSelector = createSelector(
  categoriesSelector,
  Object.values
);

export const productsListSelector = createSelector(
  productsSelector,
  Object.values
);

export const orderListSelector = createSelector(
  orderSelector,
  Object.entries
);

export const productsIdsByCategorySelector = createSelector(
  productsListSelector,
  (state, props) => props.subcategoryId,
  (products, subcategoryId) => products
    .filter(prod => prod.subcategoryId === subcategoryId)
    .map(prod => prod.slug)
);

export const orderCountSelector = createSelector(
  orderListSelector,
  order => order.reduce((acc, item) => acc + item[1], 0 )
);

export const orderProductsSelector = createSelector(
  orderListSelector,
  productsSelector,
  (order, products) => order.map(([id, count]) => {
    return {...products[id], count, subtotal: products[id].price * count};
  })
);

export const orderTotalSelector = createSelector(
  orderProductsSelector,
  products => products.reduce((acc, {subtotal}) => acc + subtotal, 0)
);








