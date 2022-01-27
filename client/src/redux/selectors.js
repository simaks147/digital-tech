import {createSelector} from "reselect";

export const categoriesSelector = (state) => state.categories;
// const productsSelector = (state) => state.products;

// export const productSelector = (state, props) => productsSelector

export const categoriesListSelector = createSelector(
  categoriesSelector,
  Object.values
);

const categoryIdBySlugSelector = createSelector(
  categoriesSelector,

);




