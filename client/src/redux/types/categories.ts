import {
  LOAD_CATEGORIES as LOAD,
  REQUEST,
  SUCCESS,
  FAILURE,
  SET_ACTIVE_CATEGORIES as SET_ACTIVE,
  ROUTER_LOCATION_CHANGE as ROUTER_LOCATION
} from "../consts";
import { IRouterLocationChangeAction } from "./common";

export interface ISubcategory {
  img: string,
  title: string,
  slug: string,
  description: string
}

export interface ICategory {
  _id: string,
  description: string,
  img: string,
  title: string,
  slug: string,
  subcategory: ISubcategory[]
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
  LOAD_CATEGORIES = LOAD,
  LOAD_CATEGORIES_REQUEST = LOAD + REQUEST,
  LOAD_CATEGORIES_SUCCESS = LOAD + SUCCESS,
  LOAD_CATEGORIES_FAILURE = LOAD + FAILURE,
  SET_ACTIVE_CATEGORIES = SET_ACTIVE
}

interface ILoadCategoriesAction {
  type: categoriesActions.LOAD_CATEGORIES,
  CallApi: string
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

export type categoriesActionType =
  ILoadCategoriesAction
  | ILoadCategoriesRequestAction
  | ILoadCategoriesSuccesstAction
  | ILoadCategoriesFailuretAction
  | ISetActiveCategoriesAction
  | IRouterLocationChangeAction