import { arrToMap, objToArr } from "../utils";
import { categoriesState, categoriesAction, categoriesActionTypes } from "../../types/categories";

const initialState: categoriesState = {
  entities: {},
  loading: false,
  loaded: false,
  error: null,
  active: null,
  activeSubcategory: null
}

export default (state = initialState, action: categoriesAction): categoriesState => {
  switch (action.type) {
    case categoriesActionTypes.LOAD_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case categoriesActionTypes.LOAD_CATEGORIES_SUCCESS:
      return {
        ...state,
        entities: arrToMap(action.data.categories),
        loading: false,
        loaded: true
      }
    case categoriesActionTypes.LOAD_CATEGORIES_FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: objToArr(action.error.error)
      }
    case categoriesActionTypes.SET_ACTIVE_CATEGORIES:
      return {
        ...state,
        active: action.categoryId,
        activeSubcategory: action.subcategoryId
      }
    case categoriesActionTypes.ROUTER_LOCATION_CHANGE:
      return {
        ...state,
        active: null,
        activeSubcategory: null
      }
    default:
      return state;
  }
}
