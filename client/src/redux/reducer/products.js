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
  FAILURE
} from "../consts";

const initialState = {
  entities: {},
  totalCount: 0,
  loading: false,
  processing: false,
  error: null
}

export default (state = initialState, action) =>
  produce(state, draft => {
    const {type, id, data, error} = action;

    switch (type) {
      case LOAD_PRODUCTS + REQUEST:
      case LOAD_PRODUCT + REQUEST:
        draft.loading = true;
        draft.error = null;
        break;

      case LOAD_PRODUCTS + SUCCESS:
        draft.loading = false;
        draft.entities = {...arrToMap(data.products.entities)};
        draft.totalCount = data.products.totalCount
        break;

      case LOAD_PRODUCT + SUCCESS:
        draft.loading = false;
        draft.entities[id] = data.product;
        break;

      case LOAD_PRODUCTS + FAILURE:
      case LOAD_PRODUCT + FAILURE:
        draft.loading = false;
        draft.error = objToArr(error.error);
        break;

      case CREATE_PRODUCT + REQUEST:
      case UPDATE_PRODUCT + REQUEST:
        draft.processing = true;
        draft.error = null;
        break;

      case CREATE_PRODUCT + SUCCESS:
      case UPDATE_PRODUCT + SUCCESS:
        draft.processing = false;
        draft.entities[id] = data.product;
        break;

      case CREATE_PRODUCT + FAILURE:
      case UPDATE_PRODUCT + FAILURE:
        draft.processing = false;
        draft.error = objToArr(error.error);
        break;

      case DELETE_PRODUCT + REQUEST:
        draft.error = null;
        break;

      case DELETE_PRODUCT + SUCCESS:
        draft.entities = Object.keys(draft.entities).reduce((acc, slug) => (slug !== id) ? {...acc, [slug]: draft.entities[slug]} : acc, {});
        draft.totalCount = draft.totalCount - 1;
        break;

      case DELETE_PRODUCT + FAILURE:
        draft.error = objToArr(error.error);
        break;

      default:
        return;
    }
  });


