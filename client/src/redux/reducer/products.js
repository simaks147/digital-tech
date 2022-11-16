import produce from "immer";
import {arrToMap, objToArr} from "../utils";
import {
  LOAD_PRODUCTS,
  LOAD_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  REQUEST,
  SUCCESS,
  FAILURE,
  LOAD_PRODUCTS_BY_RECOMMENDATIONS,
  LOAD_PRODUCTS_BY_RELATIONS,
  LOAD_PRODUCTS_BY_SALE,
  LOAD_PRODUCTS_BY_SEARCH
} from "../consts";

const initialState = {
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

export default (state = initialState, action) =>
  produce(state, draft => {
    const {type, id, data, error} = action;

    switch (type) {
      case LOAD_PRODUCTS + REQUEST:
      case LOAD_PRODUCT + REQUEST:
        draft.common.loading = true;
        draft.common.error = null;
        break;

      case LOAD_PRODUCTS + SUCCESS:
        draft.common.loading = false;
        draft.common.entities = {...arrToMap(data.products.entities)};
        draft.common.totalCount = data.products.totalCount
        draft.common.minPrice = data.products.minPrice
        draft.common.maxPrice = data.products.maxPrice
        break;

      case LOAD_PRODUCT + SUCCESS:
        draft.common.loading = false;
        draft.common.entities[id] = data.product;
        break;

      case LOAD_PRODUCTS + FAILURE:
      case LOAD_PRODUCT + FAILURE:
        draft.common.loading = false;
        draft.common.error = objToArr(error.error);
        break;



      case LOAD_PRODUCTS_BY_RECOMMENDATIONS + REQUEST:
        draft.byRecommendations.loading = true;
        draft.byRecommendations.error = null;
        break;

      case LOAD_PRODUCTS_BY_RECOMMENDATIONS + SUCCESS:
        draft.byRecommendations.loading = false;
        draft.byRecommendations.loaded = true;
        draft.byRecommendations.entities = {...arrToMap(data.recommendations)};
        break;

      case LOAD_PRODUCTS_BY_RECOMMENDATIONS + FAILURE:
        draft.byRecommendations.loading = false;
        draft.byRecommendations.error = objToArr(error.error);
        break;



      case LOAD_PRODUCTS_BY_RELATIONS + REQUEST:
        draft.byRelations.loading = true;
        draft.byRelations.error = null;
        break;

      case LOAD_PRODUCTS_BY_RELATIONS + SUCCESS:
        draft.byRelations.loading = false;
        draft.byRelations.loaded = true;
        draft.byRelations.entities = {...arrToMap(data.relations)};
        break;

      case LOAD_PRODUCTS_BY_RELATIONS + FAILURE:
        draft.byRelations.loading = false;
        draft.byRelations.error = objToArr(error.error);
        break;



      case LOAD_PRODUCTS_BY_SALE + REQUEST:
        draft.bySale.loading = true;
        draft.bySale.error = null;
        break;

      case LOAD_PRODUCTS_BY_SALE + SUCCESS:
        draft.bySale.loading = false;
        draft.bySale.loaded = true;
        draft.bySale.entities = {...arrToMap(data.sale)};
        break;

      case LOAD_PRODUCTS_BY_SALE + FAILURE:
        draft.bySale.loading = false;
        draft.bySale.error = objToArr(error.error);
        break;



      case LOAD_PRODUCTS_BY_SEARCH + REQUEST:
        draft.bySearch.loading = true;
        draft.bySearch.error = null;
        break;

      case LOAD_PRODUCTS_BY_SEARCH + SUCCESS:
        draft.bySearch.loading = false;
        // draft.bySearch.loaded = true;
        draft.bySearch.entities = {...arrToMap(data.search)};
        break;

      case LOAD_PRODUCTS_BY_SEARCH + FAILURE:
        draft.bySearch.loading = false;
        draft.bySearch.error = objToArr(error.error);
        break;



      case CREATE_PRODUCT + REQUEST:
      case UPDATE_PRODUCT + REQUEST:
        draft.common.processing = true;
        draft.common.error = null;
        break;

      case CREATE_PRODUCT + SUCCESS:
      case UPDATE_PRODUCT + SUCCESS:
        draft.common.processing = false;
        draft.common.entities[id] = data.product;
        break;

      case CREATE_PRODUCT + FAILURE:
      case UPDATE_PRODUCT + FAILURE:
        draft.common.processing = false;
        draft.common.error = objToArr(error.error);
        break;



      case DELETE_PRODUCT + REQUEST:
        draft.common.error = null;
        break;

      case DELETE_PRODUCT + SUCCESS:
        // draft.common.entities = Object.keys(draft.common.entities).reduce((acc, slug) => (slug !== id) ? {...acc, [slug]: draft.common.entities[slug]} : acc, {});
        // draft.common.totalCount = draft.totalCount - 1;
        // window.location.reload();
        break;

      case DELETE_PRODUCT + FAILURE:
        draft.common.error = objToArr(error.error);
        break;

      default:
        return;
    }
  });


