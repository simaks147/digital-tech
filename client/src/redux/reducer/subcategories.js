import {
  SUCCESS,
  LOAD_PRODUCTS,
  SET_ACTIVE_CATEGORIES,
  ROUTER_LOCATION_CHANGE
} from "../consts";
import produce from "immer";

const initialState = {
  entities: {},
  active: null
}

export default (state = initialState, action) => {
  const {type, id, subcategoryId} = action;

  switch (type) {
    case LOAD_PRODUCTS + SUCCESS:
      return produce(state, draft => {
        draft.entities[id] = id;
      });
    case SET_ACTIVE_CATEGORIES:
      return {...state, active: subcategoryId};

    case ROUTER_LOCATION_CHANGE:
      return {...state, active: null};
    default:
      return state;
  }
}



