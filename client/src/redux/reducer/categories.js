// import {categories} from "../../fixtures";
import {arrToMap} from "../utils";
import {
  LOAD_CATEGORIES,
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
    case LOAD_CATEGORIES + REQUEST:
      return {...state, loading: true, error: null}
    case LOAD_CATEGORIES + SUCCESS:
      return {...state, entities: arrToMap(data), loading: false, loaded: true}
    case LOAD_CATEGORIES + FAILURE:
      return {...state, loading: false, loaded: false, error}
    default:
      return state;
  }
}
