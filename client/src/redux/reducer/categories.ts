import { arrToMap, objToArr } from "../utils";
import { ICategoriesState, categoriesActionType, categoriesActions } from "../types/categories";
import { ROUTER_LOCATION_CHANGE } from "../consts";

const initialState: ICategoriesState = {
  entities: {},
  loading: false,
  loaded: false,
  error: null,
  active: null,
  activeSubcategory: null
}

export default (state = initialState, action: categoriesActionType): ICategoriesState => {
  switch (action.type) {
    case categoriesActions.LOAD_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case categoriesActions.LOAD_CATEGORIES_SUCCESS:
      return {
        ...state,
        entities: arrToMap(action.data.categories),
        loading: false,
        loaded: true
      }
    case categoriesActions.LOAD_CATEGORIES_FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: objToArr(action.error.error)
      }
    case categoriesActions.SET_ACTIVE_CATEGORIES:
      return {
        ...state,
        active: action.categoryId,
        activeSubcategory: action.subcategoryId
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
