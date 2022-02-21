import produce from "immer";
import {arrToMap} from "../utils";
import {
  LOAD_REVIEWS,
  REQUEST,
  SUCCESS,
  FAILURE
} from "../consts";

// const initialState = {
  // entities: {},
  // loading: false,
  // loaded: false,
  // error: null
// }

export default (state = {}, action) =>
  produce(state, draft => {
    const {type, productId, data, error} = action;

    switch (type) {
      case LOAD_REVIEWS + REQUEST:
        draft[productId] = {};
        draft[productId].loading = true;
        draft[productId].error = null;
        break;

      case LOAD_REVIEWS + SUCCESS:
        draft[productId].loading = false;
        draft[productId].loaded = true;
        draft[productId].entities = data;
        break;

      case LOAD_REVIEWS + FAILURE:
        draft[productId].loading = false;
        draft[productId].loaded = false;
        draft[productId].error = error;
        break;

      default:
        return;
    }
  });


