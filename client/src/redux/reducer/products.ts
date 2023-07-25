import produce from "immer";
import { arrToMap, objToArr } from "../utils";
import { productsActions, IProductsState, productsActionType } from "../types/product";

const initialState: IProductsState = {
  common: {
    entities: {},
    totalCount: 0,
    minPrice: 0,
    maxPrice: 100000,
    loading: false,
    processing: false,
    error: null
  },
  byRecommendations: {
    entities: {},
    loading: false,
    loaded: false,
    error: null
  },
  byRelations: {
    entities: {},
    loading: false,
    loaded: false,
    error: null
  },
  bySale: {
    entities: {},
    loading: false,
    loaded: false,
    error: null
  },
  bySearch: {
    entities: {},
    loading: false,
    // loaded: false,
    error: null
  }
}

export default (state = initialState, action: productsActionType): IProductsState =>
  produce(state, draft => {
    switch (action.type) {
      case productsActions.LOAD_PRODUCTS_REQUEST:
      case productsActions.LOAD_PRODUCT_REQUEST:
        draft.common.loading = true;
        draft.common.error = null;
        break;

      case productsActions.LOAD_PRODUCTS_SUCCESS:
        draft.common.loading = false;
        draft.common.entities = { ...arrToMap(action.data.products.entities) };
        draft.common.totalCount = action.data.products.totalCount
        draft.common.minPrice = action.data.products.minPrice
        draft.common.maxPrice = action.data.products.maxPrice
        break;

      case productsActions.LOAD_PRODUCT_SUCCESS:
        draft.common.loading = false;
        draft.common.entities[action.id] = action.data.product;
        break;

      case productsActions.LOAD_PRODUCTS_FAILURE:
      case productsActions.LOAD_PRODUCT_FAILURE:
        draft.common.loading = false;
        draft.common.error = objToArr(action.error.error);
        break;



      case productsActions.LOAD_PRODUCTS_BY_RECOMMENDATIONS_REQUEST:
        draft.byRecommendations.loading = true;
        draft.byRecommendations.error = null;
        break;

      case productsActions.LOAD_PRODUCTS_BY_RECOMMENDATIONS_SUCCESS:
        draft.byRecommendations.loading = false;
        draft.byRecommendations.loaded = true;
        draft.byRecommendations.entities = { ...arrToMap(action.data.recommendations) };
        break;

      case productsActions.LOAD_PRODUCTS_BY_RECOMMENDATIONS_FAILURE:
        draft.byRecommendations.loading = false;
        draft.byRecommendations.error = objToArr(action.error.error);
        break;



      case productsActions.LOAD_PRODUCTS_BY_RELATIONS_REQUEST:
        draft.byRelations.loading = true;
        draft.byRelations.error = null;
        break;

      case productsActions.LOAD_PRODUCTS_BY_RELATIONS_SUCCESS:
        draft.byRelations.loading = false;
        draft.byRelations.loaded = true;
        draft.byRelations.entities = { ...arrToMap(action.data.relations) };
        break;

      case productsActions.LOAD_PRODUCTS_BY_RELATIONS_FAILURE:
        draft.byRelations.loading = false;
        draft.byRelations.error = objToArr(action.error.error);
        break;



      case productsActions.LOAD_PRODUCTS_BY_SALE_REQUEST:
        draft.bySale.loading = true;
        draft.bySale.error = null;
        break;

      case productsActions.LOAD_PRODUCTS_BY_SALE_SUCCESS:
        draft.bySale.loading = false;
        draft.bySale.loaded = true;
        draft.bySale.entities = { ...arrToMap(action.data.sale) };
        break;

      case productsActions.LOAD_PRODUCTS_BY_SALE_FAILURE:
        draft.bySale.loading = false;
        draft.bySale.error = objToArr(action.error.error);
        break;



      case productsActions.LOAD_PRODUCTS_BY_SEARCH_REQUEST:
        draft.bySearch.loading = true;
        draft.bySearch.error = null;
        break;

      case productsActions.LOAD_PRODUCTS_BY_SEARCH_SUCCESS:
        draft.bySearch.loading = false;
        // draft.bySearch.loaded = true;
        draft.bySearch.entities = { ...arrToMap(action.data.search) };
        break;

      case productsActions.LOAD_PRODUCTS_BY_SEARCH_FAILURE:
        draft.bySearch.loading = false;
        draft.bySearch.error = objToArr(action.error.error);
        break;



      case productsActions.CREATE_PRODUCT_REQUEST:
      case productsActions.UPDATE_PRODUCT_REQUEST:
        draft.common.processing = true;
        draft.common.error = null;
        break;

      case productsActions.CREATE_PRODUCT_SUCCESS:
      case productsActions.UPDATE_PRODUCT_SUCCESS:
        draft.common.processing = false;
        draft.common.entities[action.id] = action.data.product;
        break;

      case productsActions.CREATE_PRODUCT_FAILURE:
      case productsActions.UPDATE_PRODUCT_FAILURE:
        draft.common.processing = false;
        draft.common.error = objToArr(action.error.error);
        break;



      case productsActions.DELETE_PRODUCT_REQUEST:
        draft.common.error = null;
        break;

      case productsActions.DELETE_PRODUCT_SUCCESS:
        // draft.common.entities = Object.keys(draft.common.entities).reduce((acc, slug) => (slug !== id) ? {...acc, [slug]: draft.common.entities[slug]} : acc, {});
        // draft.common.totalCount = draft.totalCount - 1;
        // window.location.reload();
        break;

      case productsActions.DELETE_PRODUCT_FAILURE:
        draft.common.error = objToArr(action.error.error);
        break;

      default:
        return;
    }
  });


