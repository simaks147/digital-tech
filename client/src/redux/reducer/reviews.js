import produce from "immer";
// import {arrToMap} from "../utils";
import {
  LOAD_REVIEWS,
  REQUEST,
  SUCCESS,
  FAILURE,
  ADD_REVIEW
} from "../consts";

// const initialState = {
  // entities: {},
  // loading: false,
  // loaded: false,
  // error: null
// }

export default (state = {}, action) =>
  produce(state, draft => {
    const {type, productId, values, data, error} = action;

    switch (type) {
      case LOAD_REVIEWS + REQUEST:
        draft[productId] = {};
        draft[productId].loading = true;
        draft[productId].error = null;
        break;

      case LOAD_REVIEWS + SUCCESS:
        draft[productId].loading = false;
        draft[productId].loaded = true;
        draft[productId].entities = data.reviews;
        break;

      case LOAD_REVIEWS + FAILURE:
        draft[productId].loading = false;
        draft[productId].loaded = false;
        draft[productId].error = error;
        break;

      case ADD_REVIEW:
        draft[productId].entities.push(values)
        break;

      default:
        return;
    }
  });


