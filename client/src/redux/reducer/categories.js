// import {categories} from "../../fixtures";
import {arrToMap} from "../utils";
import {
  LOAD_CATEGORIES,
  REQUEST,
  SUCCESS,
  FAILURE,
  SET_ACTIVE_CATEGORIES,
  ROUTER_LOCATION_CHANGE
} from "../consts";

const initialState = {
  entities: {},
  loading: false,
  loaded: false,
  error: null,
  active: null
}

export default (state = initialState, action) => {
  const {type, categoryId, data, error} = action;

  switch (type) {
    case LOAD_CATEGORIES + REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case LOAD_CATEGORIES + SUCCESS:
      return {
        ...state,
        entities: arrToMap(data),
        loading: false,
        loaded: true
      }
    case LOAD_CATEGORIES + FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
        error
      }
    case SET_ACTIVE_CATEGORIES:
      return {
        ...state,
        active: categoryId
      }
    case ROUTER_LOCATION_CHANGE:
      return {
        ...state,
        active: null
      }
    default:
      return state;
  }
}
