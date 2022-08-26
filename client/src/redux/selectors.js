import {createSelector} from "reselect";

export const categoriesSelector = (state) => state.categories.entities;
export const brandsSelector = (state) => state.brands.entities;
export const productsSelector = (state) => state.products.common.entities;
export const recommendationsSelector = (state) => state.products.byRecommendations.entities;
export const relationsSelector = (state) => state.products.byRelations.entities;
export const saleSelector = (state) => state.products.bySale.entities;
export const reviewsSelector = (state) => state.reviews;
export const orderSelector = (state) => state.order.entities;
export const routerSelector = (state) => state.router;
export const queryParamsSelector = (state) => state.router.location.query;

export const loadingCategoriesSelector = (state) => state.categories.loading;
export const loadedCategoriesSelector = (state) => state.categories.loaded;
export const errorCategoriesSelector = (state) => state.categories.error;

export const loadingBrandsSelector = (state) => state.brands.loading;
export const loadedBrandsSelector = (state) => state.brands.loaded;
export const errorBrandsSelector = (state) => state.brands.error;

export const loadingProductsSelector = (state) => state.products.common.loading;
export const processingProductsSelector = (state) => state.products.common.processing;
export const errorProductsSelector = (state) => state.products.common.error;
export const totalCountProductsSelector = (state) => state.products.common.totalCount;
export const minPriceProductsSelector = (state) => state.products.common.minPrice;
export const maxPriceProductsSelector = (state) => state.products.common.maxPrice;

export const loadingRecommendationsSelector = (state) => state.products.byRecommendations.loading;
export const loadedRecommendationsSelector = (state) => state.products.byRecommendations.loaded;
export const errorRecommendationsSelector = (state) => state.products.byRecommendations.error;

export const loadingRelationsSelector = (state) => state.products.byRelations.loading;
export const loadedRelationsSelector = (state) => state.products.byRelations.loaded;
export const errorRelationsSelector = (state) => state.products.byRelations.error;

export const loadingSaleSelector = (state) => state.products.bySale.loading;
export const loadedSaleSelector = (state) => state.products.bySale.loaded;
export const errorSaleSelector = (state) => state.products.bySale.error;

export const loadingReviewsByProductSelector = (state, {productId}) => reviewsSelector(state)[productId]?.loading;
export const loadedReviewsByProductSelector = (state, {productId}) => reviewsSelector(state)[productId]?.loaded;
export const errorReviewsByProductSelector = (state, {productId}) => reviewsSelector(state)[productId]?.error;

export const processingOrderSelector = (state) => state.order.processing;
export const errorOrderSelector = (state) => state.order.error;

export const productSelector = (state, {id}) => productsSelector(state)[id];
export const orderItemSelector = (state, {id}) => orderSelector(state)[id];

export const activeCategorySelector = (state) => state.categories.active;
export const activeSubcategorySelector = (state) => state.categories.activeSubcategory;

export const reviewsByProductSelector = (state, id) => reviewsSelector(state)[id]?.entities;

export const loginSelector = (state) => state.auth.login;
export const tokenSelector = (state) => state.auth.token;
export const oauthCallbackSelector = (state) => state.auth.oauthCallback;
export const registrationSelector = (state) => state.auth.registration;
export const confirmationSelector = (state) => state.auth.confirmation;

export const profileSelector = (state) => state.auth.profile;
export const fetchingProfileSelector = (state) => profileSelector(state).fetching;
export const errorProfileSelector = (state) => profileSelector(state).error;

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

export const recommendationsListSelector = createSelector(
  recommendationsSelector,
  Object.values
);

export const relationsListSelector = createSelector(
  relationsSelector,
  Object.values
);

export const saleListSelector = createSelector(
  saleSelector,
  Object.values
);

export const orderListSelector = createSelector(
  orderSelector,
  Object.values
);

export const orderCountSelector = createSelector(
  orderListSelector,
  order => order.reduce((acc, item) => acc + item.count, 0)
);

export const orderSubtotalSelector = createSelector(
  orderItemSelector,
  orderItem => orderItem.sale.price * orderItem.count
);

export const orderTotalSelector = createSelector(
  orderListSelector,
  order => order.reduce((acc, orderItem) => acc + orderItem.sale.price * orderItem.count, 0)
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










