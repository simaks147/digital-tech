import { arrToMap, objToArr } from "../utils";
import { IBrandType, IBrandsStateType, brandsActions, brandsActionType } from '../../types/brands'

const initialState: IBrandsStateType = {
  entities: {},
  loading: false,
  loaded: false,
  error: null
}

export default (state = initialState, action: brandsActionType): IBrandsStateType => {
  switch (action.type) {
    case brandsActions.LOAD_BRANDS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case brandsActions.LOAD_BRANDS_SUCCESS:
      return {
        ...state,
        entities: arrToMap(action.data.brands),
        loading: false,
        loaded: true,
      }
    case brandsActions.LOAD_BRANDS_FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: objToArr(action.error.error)
      }
    default:
      return state;
  }
}
