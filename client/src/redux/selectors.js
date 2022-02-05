import {createSelector} from "reselect";

export const categoriesSelector = (state) => state.categories;
export const productsSelector = (state) => state.products;
export const orderSelector = (state) => state.order;

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

export const orderCountSelector = createSelector(
  orderListSelector,
  order => order.reduce((acc, item) => acc + item[1], 0 )
);

const subcategoryBySlugSelector = createSelector(
  categoriesListSelector,
  (state, props) => props.match.params.slug,
  (categories, slug) => categories
    .flatMap(cat => cat.subcategory)
    .find(subcat => subcat.slug === slug)
);

export const productsIdsByCategorySelector = createSelector(
  productsListSelector,
  subcategoryBySlugSelector,
  (products, subcategory) => products
    .filter(prod => prod.subcategoryId === subcategory.id)
    .map(prod => prod.id)
);

export const productIdBySlugSelector = createSelector(
  productsListSelector,
  (state, props) => props.match.params.slug,
  (products, slug) => products.find(prod => prod.slug === slug).id
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








