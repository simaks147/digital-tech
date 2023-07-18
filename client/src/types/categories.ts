import {
  LOAD_CATEGORIES,
  REQUEST,
  SUCCESS,
  FAILURE,
  SET_ACTIVE_CATEGORIES as SET_ACTIVE,
  ROUTER_LOCATION_CHANGE as ROUTER_LOCATION
} from "../redux/consts";

interface ISubcategory {
  img: string,
  title: string,
  slug: string,
}

export interface ICategory {
  _id: string,
  description: string,
  img: string,
  title: string,
  slug: string,
  subcategory: ISubcategory
}

export interface ICategoriesState {
  entities: { [key: string]: ICategory },
  loading: boolean,
  loaded: boolean,
  error: null | string[],
  active: null | string,
  activeSubcategory: null | string
}

export enum categoriesActions {
  LOAD_CATEGORIES_REQUEST = LOAD_CATEGORIES + REQUEST,
  LOAD_CATEGORIES_SUCCESS = LOAD_CATEGORIES + SUCCESS,
  LOAD_CATEGORIES_FAILURE = LOAD_CATEGORIES + FAILURE,
  SET_ACTIVE_CATEGORIES = SET_ACTIVE,
  ROUTER_LOCATION_CHANGE = ROUTER_LOCATION
}

interface ILoadCategoriesRequestAction {
  type: categoriesActions.LOAD_CATEGORIES_REQUEST
}

interface ILoadCategoriesSuccesstAction {
  type: categoriesActions.LOAD_CATEGORIES_SUCCESS,
  data: { categories: ICategory[] },
}

interface ILoadCategoriesFailuretAction {
  type: categoriesActions.LOAD_CATEGORIES_FAILURE,
  error: { error: { [key: string]: string } }
}

interface ISetActiveCategoriesAction {
  type: categoriesActions.SET_ACTIVE_CATEGORIES,
  categoryId: string,
  subcategoryId: string
}

interface IRouterLocationChangeAction {
  type: categoriesActions.ROUTER_LOCATION_CHANGE,
  categoryId: null,
  subcategoryId: null
}

export type categoriesActionType = ILoadCategoriesRequestAction
  | ILoadCategoriesSuccesstAction
  | ILoadCategoriesFailuretAction
  | ISetActiveCategoriesAction
  | IRouterLocationChangeAction