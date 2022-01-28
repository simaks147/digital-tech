import {createSelector} from "reselect";

export const categoriesSelector = (state) => state.categories;
export const productsSelector = (state) => state.products;

export const productSelector = (state, {id}) => productsSelector(state)[id];


export const categoriesListSelector = createSelector(
  categoriesSelector,
  Object.values
);

export const productsListSelector = createSelector(
  productsSelector,
  Object.values
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






