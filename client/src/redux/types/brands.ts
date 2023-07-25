import {
  LOAD_BRANDS,
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
  LOAD_BRANDS_REQUEST = LOAD_BRANDS + REQUEST,
  LOAD_BRANDS_SUCCESS = LOAD_BRANDS + SUCCESS,
  LOAD_BRANDS_FAILURE = LOAD_BRANDS + FAILURE
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
  ILoadBrandsRequestActionType
  | ILoadBrandsSuccesstActionType
  | ILoadBrandsFailuretActionType