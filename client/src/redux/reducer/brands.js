import {arrToMap, objToArr} from "../utils";
import {
  LOAD_BRANDS,
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

export default (state = initialState, action) => {
  const {type, data, error} = action;

  switch (type) {
    case LOAD_BRANDS + REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case LOAD_BRANDS + SUCCESS:
      return {
        ...state,
        entities: arrToMap(data.brands),
        loading: false,
        loaded: true
      }
    case LOAD_BRANDS + FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: objToArr(error.error)
      }
    default:
      return state;
  }
}
