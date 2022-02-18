import produce from "immer";
import {arrToMap} from "../utils";
import {
  LOAD_REVIEWS,
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
    const {type, data, error} = action;

    switch (type) {
      case LOAD_REVIEWS + REQUEST:
        draft.loading = true;
        break;

      case LOAD_REVIEWS + SUCCESS:
        draft.loading = false;
        draft.loaded = true;
        draft.entities = {...draft.entities, ...arrToMap(data)};
        break;

      case LOAD_REVIEWS + FAILURE:
        draft.loading = false;
        draft.loaded = false;
        draft.error = error;
        break;

      default:
        return;
    }
  });


