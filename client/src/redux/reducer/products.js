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
  loading: {},
  loaded: {},
  error: null
}

export default (state = initialState, action) =>
  produce(state, draft => {
    const {type, id, categoryId, data, error} = action;

    switch (type) {
      case LOAD_PRODUCTS + REQUEST:
        draft.loading[categoryId] = true;
        break;

      case LOAD_PRODUCTS + SUCCESS:
        draft.loading[categoryId] = false;
        draft.loaded[categoryId] = true;
        draft.entities[categoryId] = arrToMap(data)
        break;

      case LOAD_PRODUCTS + FAILURE:
        draft.loading.categories[categoryId] = false;
        draft.loaded.categories[categoryId] = false;
        draft.error = error;
        break;

      default:
        return;
    }
  });


