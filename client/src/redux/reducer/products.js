// import {products} from "../../fixtures";
import produce from "immer";
import {arrToMap} from "../utils";
import {
  LOAD_PRODUCTS,
  LOAD_PRODUCT,
  REQUEST,
  SUCCESS,
  FAILURE
} from "../consts";

const initialState = {
  entities: {},
  loading: false,
  loaded: false,
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
        draft.entities = {...draft.entities, ...arrToMap(data)};
        break;

      case LOAD_PRODUCT + SUCCESS:
        draft.loading = false;
        draft.loaded = true;
        draft.entities[id] = data;
        break;

      case LOAD_PRODUCTS + FAILURE:
      case LOAD_PRODUCT + FAILURE:
        draft.loading = false;
        draft.loaded = false;
        draft.error = error;
        break;

      default:
        return;
    }
  });


