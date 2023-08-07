import {
  LOAD_BRANDS as LOAD,
  REQUEST,
  SUCCESS,
  FAILURE
} from "../consts";

export interface IBrand {
  id: string,
  title: string
}

export interface IBrandsState {
  entities: { [key: string]: IBrand },
  loading: boolean,
  loaded: boolean,
  error: null | string[]
}

export enum brandsActions {
  LOAD_BRANDS = LOAD,
  LOAD_BRANDS_REQUEST = LOAD + REQUEST,
  LOAD_BRANDS_SUCCESS = LOAD + SUCCESS,
  LOAD_BRANDS_FAILURE = LOAD + FAILURE
}

interface ILoadBrandsAction {
  type: brandsActions.LOAD_BRANDS,
  CallApi: string
}

interface ILoadBrandsRequestActionType {
  type: brandsActions.LOAD_BRANDS_REQUEST
}

interface ILoadBrandsSuccesstActionType {
  type: brandsActions.LOAD_BRANDS_SUCCESS,
  data: { brands: IBrand[] },
}

interface ILoadBrandsFailuretActionType {
  type: brandsActions.LOAD_BRANDS_FAILURE,
  error: { error: { [key: string]: string } }
}

export type brandsActionType =
  ILoadBrandsAction
  | ILoadBrandsRequestActionType
  | ILoadBrandsSuccesstActionType
  | ILoadBrandsFailuretActionType