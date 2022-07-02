import produce from "immer";
import {arrToMap, objToArr} from "../utils";
import {
  LOAD_PRODUCTS,
  LOAD_PRODUCT,
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  REQUEST,
  SUCCESS,
  FAILURE
} from "../consts";

const initialState = {
  entities: {},
  loading: false,
  loaded: false,
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
        break;

      case LOAD_PRODUCTS + SUCCESS:
        draft.loading = false;
        draft.loaded = true;
        draft.entities = {...draft.entities, ...arrToMap(data.products)};
        break;

      case LOAD_PRODUCT + SUCCESS:
        draft.loading = false;
        draft.loaded = true;
        draft.entities[id] = data.product;
        break;

      case LOAD_PRODUCTS + FAILURE:
      case LOAD_PRODUCT + FAILURE:
        draft.loading = false;
        draft.loaded = false;
        draft.error = objToArr(error.error);
        break;

      case CREATE_PRODUCT + REQUEST:
        draft.processing = true;
        draft.error = null;
        break;

      case CREATE_PRODUCT + SUCCESS:
        draft.processing = false;
        draft.entities[id] = data.product;
        break;

      case CREATE_PRODUCT + FAILURE:
        draft.processing = false;
        draft.error = objToArr(error.error);
        break;

      case DELETE_PRODUCT + REQUEST:
        draft.error = null;
        break;

      case DELETE_PRODUCT + SUCCESS:
        draft.entities = {};
        break;

      case DELETE_PRODUCT + FAILURE:
        draft.error = 'erger';
        break;

      default:
        return;
    }
  });


