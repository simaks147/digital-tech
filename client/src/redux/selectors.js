import {createSelector} from "reselect";

export const categoriesSelector = (state) => state.categories.entities;
export const productsSelector = (state) => state.products.entities;
export const orderSelector = (state) => state.order;
export const subcategoriesSelector = (state) => state.subcategories.entities;

export const loadingCategoriesSelector = (state) => state.categories.loading;
export const loadedCategoriesSelector = (state) => state.categories.loaded;

export const loadingProductsSelector = (state) => state.products.loading;
export const loadedProductsSelector = (state) => state.products.loaded;

export const productSelector = (state, {id}) => productsSelector(state)[id];

// export const activeProductIdSelector = (state, {id}) => state.products.active;
export const activeCategorySelector = (state) => state.categories.active;
export const activeSubcategorySelector = (state) => state.subcategories.active;


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

export const subcategoriesListSelector = createSelector(
  subcategoriesSelector,
  Object.values
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

export const activeCategoryBySubcategorySelector = createSelector(
  categoriesListSelector,
  (state, {id}) => id,
  (categories, activeSubcategory) => {
    return categories
      .find(category => category.subcategory
        .map(subcat => subcat.slug)
        .includes(activeSubcategory)).slug

  }
);

export const activeSubCategoryByProductSelector = createSelector(
  productsSelector,
  (state, {id}) => id,
  (products, id) => {
    // console.log(products, id);
    return products[id].subcategoryId
  }
);








