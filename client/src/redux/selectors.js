import {createSelector} from "reselect";

export const categoriesSelector = (state) => state.categories.entities;
export const brandsSelector = (state) => state.brands.entities;
export const productsSelector = (state) => state.products.entities;
export const reviewsSelector = (state) => state.reviews;
export const orderSelector = (state) => state.order.entities;
export const routerSelector = (state) => state.router;
export const queryParamsSelector = (state) => state.router.location.query;

export const loadingCategoriesSelector = (state) => state.categories.loading;
export const loadedCategoriesSelector = (state) => state.categories.loaded;

export const loadingBrandsSelector = (state) => state.brands.loading;
export const loadedBrandsSelector = (state) => state.brands.loaded;

export const loadingProductsSelector = (state) => state.products.loading;
export const processingProductsSelector = (state) => state.products.processing;
export const errorProductsSelector = (state) => state.products.error;
export const totalCountProductsSelector = (state) => state.products.totalCount;
export const minPriceProductsSelector = (state) => state.products.minPrice;
export const maxPriceProductsSelector = (state) => state.products.maxPrice;

export const loadingReviewsByProductSelector = (state, {productId}) => reviewsSelector(state)[productId]?.loading;
export const loadedReviewsByProductSelector = (state, {productId}) => reviewsSelector(state)[productId]?.loaded;

export const processingOrderSelector = (state) => state.order.processing;
export const errorOrderSelector = (state) => state.order.error;

export const productSelector = (state, {id}) => productsSelector(state)[id];

export const activeCategorySelector = (state) => state.categories.active;
export const activeSubcategorySelector = (state) => state.categories.activeSubcategory;

export const reviewsByProductSelector = (state, id) => reviewsSelector(state)[id]?.entities;

export const loginSelector = (state) => state.auth.login;
export const tokenSelector = (state) => state.auth.token;
export const oauthCallbackSelector = (state) => state.auth.oauthCallback;
export const registrationSelector = (state) => state.auth.registration;
export const confirmationSelector = (state) => state.auth.confirmation;
export const profileSelector = (state) => state.auth.profile;

export const activeNavSelector = (state) => state.nav.active

export const categoriesListSelector = createSelector(
  categoriesSelector,
  Object.values
);

export const brandsListSelector = createSelector(
  brandsSelector,
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
  order => order.reduce((acc, item) => acc + item[1], 0)
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
  (state, {subcategoryId}) => subcategoryId,
  (categories, activeSubcategory) => categories
    .find(category => category.subcategory
      .map(subcat => subcat.slug)
      .includes(activeSubcategory))?.slug
);

export const activeSubCategoryByProductSelector = createSelector(
  productsSelector,
  (state, {id}) => id,
  (products, id) => (products[id])?.subcategoryId
);

export const activeBasketViewSelector = createSelector(
  routerSelector,
  router => {
    const path = router.location.pathname.split('/', 3);
    return path[path.length - 1];
  }
);

export const ratingSelector = createSelector(
  reviewsByProductSelector,
  reviews => ({
    overall: Math.round((reviews?.reduce((acc, review) => acc + review.rating, 0) / reviews?.length) * 100) / 100,
    recommendedLength: reviews?.filter(review => review.recommended === true).length,
    recommendedShare: function () {
      return Math.round(this.recommendedLength / reviews.length * 100 * 100) / 100
    }
  })
);

export const subcategoriesListSelector = createSelector(
  categoriesListSelector,
  categories => categories.flatMap(category => category.subcategory)
);

export const subcategoriesSelector = createSelector(
  subcategoriesListSelector,
  categories => categories.reduce((acc, category) => ({...acc, [category.slug]: category}), {})
);

export const productsLimitSelector = createSelector(
  queryParamsSelector,
  (state, {limitVariants}) => limitVariants,
  (queryParams, limitVariants) => limitVariants.includes(queryParams.limit) ? queryParams.limit : limitVariants[0]
);

export const productsSortSelector = createSelector(
  queryParamsSelector,
  (state, {sortVariants}) => sortVariants,
  (queryParams, sortVariants) => sortVariants.includes(queryParams.sort) ? queryParams.sort : sortVariants[0]
);

export const productsAllPagesSelector = createSelector(
  totalCountProductsSelector,
  productsLimitSelector,
  (totalCount, limit) => {
    const pages = [];
    const productsLimit = Number(limit) ? Math.ceil(totalCount / limit) : 1;

    for (let i = 1; i <= productsLimit; i++) {
      pages.push(i);
    }

    return pages;
  }
);

export const productsPageSelector = createSelector(
  queryParamsSelector,
  productsAllPagesSelector,
  (queryParams, productsAllPages) => productsAllPages.includes(Number(queryParams.page)) ? Number(queryParams.page) : 1
);

export const productsFiltersSelector = createSelector(
  queryParamsSelector,
  queryParams => {
    if (!queryParams.filters) return {};

    const filtersEntries = decodeURIComponent(queryParams.filters).split(',').map(filter => filter.split(':'));

    return filtersEntries.reduce((acc, [key, values]) => {
      return {...acc, [key]: values?.split('|')};
    }, {});
  }
);










