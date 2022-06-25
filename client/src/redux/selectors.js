import {createSelector} from "reselect";

export const categoriesSelector = (state) => state.categories.entities;
export const brandsSelector = (state) => state.brands.entities;
export const productsSelector = (state) => state.products.entities;
export const reviewsSelector = (state) => state.reviews;
export const orderSelector = (state) => state.order.entities;
export const subcategoriesSelector = (state) => state.subcategories.entities;
export const routerSelector = (state) => state.router;

export const loadingCategoriesSelector = (state) => state.categories.loading;
export const loadedCategoriesSelector = (state) => state.categories.loaded;

export const loadingBrandsSelector = (state) => state.brands.loading;
export const loadedBrandsSelector = (state) => state.brands.loaded;

export const loadingProductsSelector = (state) => state.products.loading;
export const loadedProductsSelector = (state) => state.products.loaded;

export const loadingReviewsByProductSelector = (state, {slug}) => reviewsSelector(state)[slug]?.loading;
export const loadedReviewsByProductSelector = (state, {slug}) => reviewsSelector(state)[slug]?.loaded;

export const processingOrderSelector = (state) => state.order.processing;
export const errorOrderSelector = (state) => state.order.error;

export const productSelector = (state, {id}) => productsSelector(state)[id];

export const activeCategorySelector = (state) => state.categories.active;
export const activeSubcategorySelector = (state) => state.subcategories.active;

export const reviewsByProductSelector = (state, {slug}) => reviewsSelector(state)[slug]?.entities;

export const loginSelector = (state) => state.auth.login;
export const tokenSelector = (state) => state.auth.token;
export const oauthSelector = (state) => state.auth.oauth;
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
  (state, {subcategoryId}) => subcategoryId,
  (categories, activeSubcategory) => categories
      .find(category => category.subcategory
        .map(subcat => subcat.slug)
        .includes(activeSubcategory)).slug
);

export const activeSubCategoryByProductSelector = createSelector(
  productsSelector,
  (state, {id}) => id,
  (products, id) => products[id].subcategoryId
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
    recommendedShare: function() {
      return Math.round(this.recommendedLength / reviews.length * 100 * 100) / 100
    }
  })
);

export const brandsByProductsSelector = createSelector(
  brandsListSelector,
  productsListSelector,
  activeSubcategorySelector,
  (brands, products, activeCategory) => brands
    .filter(brand => products
      .filter(prod => prod.subcategoryId === activeCategory)
      .find(prod => prod.brand.id === brand.id)
    )
);

export const subcategoriesListSelector = createSelector(
  categoriesListSelector,
  categories => categories.flatMap(category => category.subcategory)
);










