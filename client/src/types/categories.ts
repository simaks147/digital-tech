import {
  LOAD_CATEGORIES,
  REQUEST,
  SUCCESS,
  FAILURE,
  SET_ACTIVE_CATEGORIES as SET_ACTIVE,
  ROUTER_LOCATION_CHANGE as ROUTER_LOCATION
} from "../redux/consts";

export interface categoriesState {
  entities: object,
  loading: boolean,
  loaded: boolean,
  error: null | string[],
  active: null | string,
  activeSubcategory: null | string
}

export enum categoriesActionTypes {
  LOAD_CATEGORIES_REQUEST = LOAD_CATEGORIES + REQUEST,
  LOAD_CATEGORIES_SUCCESS = LOAD_CATEGORIES + SUCCESS,
  LOAD_CATEGORIES_FAILURE = LOAD_CATEGORIES + FAILURE,
  SET_ACTIVE_CATEGORIES = SET_ACTIVE,
  ROUTER_LOCATION_CHANGE = ROUTER_LOCATION
}

interface loadCategoriesRequestAction {
  type: categoriesActionTypes.LOAD_CATEGORIES_REQUEST
}

interface loadCategoriesSuccesstAction {
  type: categoriesActionTypes.LOAD_CATEGORIES_SUCCESS,
  data: { categories: object[] },
}

interface loadCategoriesFailuretAction {
  type: categoriesActionTypes.LOAD_CATEGORIES_FAILURE,
  error: { error: { [key: string]: string } }
}

interface setActiveCategoriesAction {
  type: categoriesActionTypes.SET_ACTIVE_CATEGORIES,
  categoryId: string,
  subcategoryId: string
}

interface routerLocationChangeAction {
  type: categoriesActionTypes.ROUTER_LOCATION_CHANGE,
  categoryId: null,
  subcategoryId: null
}

export type categoriesAction = loadCategoriesRequestAction
  | loadCategoriesSuccesstAction
  | loadCategoriesFailuretAction
  | setActiveCategoriesAction
  | routerLocationChangeAction