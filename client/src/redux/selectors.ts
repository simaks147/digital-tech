import { createSelector } from "reselect";
import { RootStateType } from "./store";
import { ICategory, ISubcategory } from "./types/categories";
import { IBrand } from "./types/brands";
import { IProduct } from "./types/products";
import { OrderProductType } from "./types/order";
import { ICurrency } from "./types/currencies";
import { PRODUCTS_LIMIT_VARIANTS, PRODUCTS_SORT_VARIANTS } from "../utils/consts";

export const categoriesSelector = (state: RootStateType) => state.categories.entities;
export const brandsSelector = (state: RootStateType) => state.brands.entities;
export const productsSelector = (state: RootStateType) => state.products.common.entities;
export const recommendationsSelector = (state: RootStateType) => state.products.byRecommendations.entities;
export const relationsSelector = (state: RootStateType) => state.products.byRelations.entities;
export const saleSelector = (state: RootStateType) => state.products.bySale.entities;
export const searchSelector = (state: RootStateType) => state.products.bySearch.entities;
export const reviewsSelector = (state: RootStateType) => state.reviews;
export const orderSelector = (state: RootStateType) => state.order.entities;
export const currenciesSelector = (state: RootStateType) => state.currencies.entities;
export const chatSelector = (state: RootStateType) => state.chat.entities;
export const routerSelector = (state: RootStateType) => state.router;
export const queryParamsSelector = (state: RootStateType) => state.router.location.query;

export const loadingCategoriesSelector = (state: RootStateType) => state.categories.loading;
export const loadedCategoriesSelector = (state: RootStateType) => state.categories.loaded;
export const errorCategoriesSelector = (state: RootStateType) => state.categories.error;

export const loadingBrandsSelector = (state: RootStateType) => state.brands.loading;
export const loadedBrandsSelector = (state: RootStateType) => state.brands.loaded;
export const errorBrandsSelector = (state: RootStateType) => state.brands.error;

export const loadingProductsSelector = (state: RootStateType) => state.products.common.loading;
export const processingProductsSelector = (state: RootStateType) => state.products.common.processing;
export const errorProductsSelector = (state: RootStateType) => state.products.common.error;
export const totalCountProductsSelector = (state: RootStateType) => state.products.common.totalCount;
export const minPriceProductsSelector = (state: RootStateType) => state.products.common.minPrice;
export const maxPriceProductsSelector = (state: RootStateType) => state.products.common.maxPrice;

export const loadingRecommendationsSelector = (state: RootStateType) => state.products.byRecommendations.loading;
export const loadedRecommendationsSelector = (state: RootStateType) => state.products.byRecommendations.loaded;
export const errorRecommendationsSelector = (state: RootStateType) => state.products.byRecommendations.error;

export const loadingRelationsSelector = (state: RootStateType) => state.products.byRelations.loading;
export const loadedRelationsSelector = (state: RootStateType) => state.products.byRelations.loaded;
export const errorRelationsSelector = (state: RootStateType) => state.products.byRelations.error;

export const loadingSaleSelector = (state: RootStateType) => state.products.bySale.loading;
export const loadedSaleSelector = (state: RootStateType) => state.products.bySale.loaded;
export const errorSaleSelector = (state: RootStateType) => state.products.bySale.error;

export const loadingSearchSelector = (state: RootStateType) => state.products.bySearch.loading;
export const errorSearchSelector = (state: RootStateType) => state.products.bySearch.error;

export const loadingReviewsByProductSelector = (state: RootStateType, { productId }: { productId: string }) => reviewsSelector(state)[productId]?.loading;
export const loadedReviewsByProductSelector = (state: RootStateType, { productId }: { productId: string }) => reviewsSelector(state)[productId]?.loaded;
export const errorReviewsByProductSelector = (state: RootStateType, { productId }: { productId: string }) => reviewsSelector(state)[productId]?.error;

export const processingOrderSelector = (state: RootStateType) => state.order.processing;
export const errorOrderSelector = (state: RootStateType) => state.order.error;
export const messageOrderSelector = (state: RootStateType) => state.order.message;

export const productSelector = (state: RootStateType, { id }: { id: string }) => productsSelector(state)[id];
export const orderItemSelector = (state: RootStateType, { id }: { id: string }) => orderSelector(state)[id];

export const activeCategorySelector = (state: RootStateType) => state.categories.active;
export const activeSubcategorySelector = (state: RootStateType) => state.categories.activeSubcategory;

export const reviewsByProductSelector = (state: RootStateType, id: string) => reviewsSelector(state)[id]?.entities;

export const loginSelector = (state: RootStateType) => state.auth.login;
export const tokenSelector = (state: RootStateType) => state.auth.token;
export const oauthCallbackSelector = (state: RootStateType) => state.auth.oauthCallback;
export const registrationSelector = (state: RootStateType) => state.auth.registration;
export const confirmationSelector = (state: RootStateType) => state.auth.confirmation;

export const profileSelector = (state: RootStateType) => state.auth.profile;
export const dataProfileSelector = (state: RootStateType) => profileSelector(state).data;
export const fetchingProfileSelector = (state: RootStateType) => profileSelector(state).fetching;
export const checkedProfileSelector = (state: RootStateType) => profileSelector(state).checked;
export const errorProfileSelector = (state: RootStateType) => profileSelector(state).error;

export const activeNavSelector = (state: RootStateType) => state.nav.active;

export const checkedCurrencySelector = (state: RootStateType) => state.currencies.checkedCurrency;

export const connectedChatSelector = (state: RootStateType) => state.chat.connected;


export const categoriesListSelector = createSelector(
  categoriesSelector,
  Object.values<ICategory>
);

export const brandsListSelector = createSelector(
  brandsSelector,
  Object.values<IBrand>
);

export const productsListSelector = createSelector(
  productsSelector,
  Object.values<IProduct>
);

export const recommendationsListSelector = createSelector(
  recommendationsSelector,
  Object.values<IProduct>
);

export const relationsListSelector = createSelector(
  relationsSelector,
  Object.values<IProduct>
);

export const saleListSelector = createSelector(
  saleSelector,
  Object.values<IProduct>
);

export const searchListSelector = createSelector(
  searchSelector,
  Object.values<IProduct>
);

export const orderListSelector = createSelector(
  orderSelector,
  Object.values<OrderProductType>
);

export const currenciesListSelector = createSelector(
  currenciesSelector,
  Object.values<ICurrency>
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
  (state: RootStateType, { subcategoryId }: { subcategoryId: string }) => subcategoryId,
  (categories, activeSubcategory) => categories
    .find(category => category.subcategory
      .map(subcat => subcat.slug)
      .includes(activeSubcategory))?.slug || ''
);

export const activeSubCategoryByProductSelector = createSelector(
  productsSelector,
  (state: RootStateType, { id }: { id: string }) => id,
  (products, id) => (products[id])?.subcategoryId || ''
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
    overall: reviews?.length > 0
      ? Math.round((reviews.reduce((acc, review) => acc + review.rating, 0) / reviews?.length) * 100) / 100
      : 0,
    recommendedLength: reviews?.length > 0
      ? reviews.filter(review => review.recommended === true).length
      : 0,
    recommendedShare: function () {
      return Math.round(this.recommendedLength / reviews.length * 100 * 100) / 100
    }
  })
);

export const subcategoriesListSelector = createSelector(
  categoriesListSelector,
  categories => categories
    .flatMap(category => category.subcategory)
    .sort((a, b) => {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();

      if (titleA < titleB) return -1;
      if (titleA > titleB) return 1;
      return 0;
    })
);

export const subcategoriesSelector = createSelector(
  subcategoriesListSelector,
  categories => categories.reduce((acc, category) => ({ ...acc, [category.slug]: category }), {} as Record<string, ISubcategory>)
);

export const productsLimitSelector = createSelector(
  queryParamsSelector,
  (queryParams) => PRODUCTS_LIMIT_VARIANTS.includes(queryParams.limit) ? queryParams.limit : PRODUCTS_LIMIT_VARIANTS[0]
);

export const productsSortSelector = createSelector(
  queryParamsSelector,
  (queryParams) => PRODUCTS_SORT_VARIANTS.includes(queryParams.sort) ? queryParams.sort : PRODUCTS_SORT_VARIANTS[0]
);

export const productsAllPagesSelector = createSelector(
  totalCountProductsSelector,
  productsLimitSelector,
  (totalCount, limit) => {
    const pages: number[] = [];
    const productsLimit = Number(limit) ? Math.ceil(totalCount / Number(limit)) : 1;

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

export const productsFiltersSelector: ((state: RootStateType) => Record<string, any> | undefined) = createSelector(
  queryParamsSelector,
  queryParams => {
    if (!queryParams.filters) return;

    const filtersEntries = decodeURIComponent(queryParams.filters).split(',').map(filter => filter.split(':'));

    return filtersEntries.reduce((acc, [key, values]) => {
      return { ...acc, [key]: values?.split('|') };
    }, {});
  }
);

// five (5) random subcategories
export const randomSubcategoriesSelector = createSelector(
  categoriesListSelector,
  categories => categories
    .flatMap(parent => parent.subcategory.map(child => ({ ...child, parentTitle: parent.title })))
    .map(child => ({ child, sort: Math.random() }))
    .sort((childA, childB) => childA.sort - childB.sort)
    .map(({ child }) => child)
    .filter((_, i) => i < 5)
);










