import {arrToMap, objToArr} from "../utils";
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
  active: null,
  activeSubcategory: null
}

export default (state = initialState, action) => {
  const {type, categoryId, subcategoryId, data, error} = action;

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
        entities: arrToMap(data.categories),
        loading: false,
        loaded: true
      }
    case LOAD_CATEGORIES + FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: objToArr(error.error)
      }
    case SET_ACTIVE_CATEGORIES:
      return {
        ...state,
        active: categoryId,
        activeSubcategory: subcategoryId
      }
    case ROUTER_LOCATION_CHANGE:
      return {
        ...state,
        active: null,
        activeSubcategory: null
      }
    default:
      return state;
  }
}
