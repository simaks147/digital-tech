import {
  INCREASE_CART as INCREASE,
  DECREASE_CART as DECREASE,
  REMOVE_FROM_CART as REMOVE,
  MAKE_ORDER as MAKE,
  // PROCESS_CHECKOUT,
  REQUEST,
  SUCCESS,
  FAILURE,
  ROUTER_LOCATION_CHANGE as ROUTER_LOCATION
} from "../consts";
import { IError, IRouterLocationChangeAction, TokenType } from "./common";
import { IProduct } from "./products";

interface IOrder {
  id: string,
  message: string
}

export type OrderProductType = IProduct & { count: number }

export interface IOrderProducts {
  [key: string]: OrderProductType
}

export interface IOrdersState {
  entities: IOrderProducts,
  processing: boolean,
  error: null | string[],
  message: null | string
}

export enum ordersActions {
  INCREASE_CART = INCREASE,
  DECREASE_CART = DECREASE,
  REMOVE_FROM_CART = REMOVE,
  MAKE_ORDER = MAKE,
  MAKE_ORDER_REQUEST = MAKE + REQUEST,
  MAKE_ORDER_SUCCESS = MAKE + SUCCESS,
  MAKE_ORDER_FAILURE = MAKE + FAILURE
}

interface IIncreaseCartAction {
  type: ordersActions.INCREASE_CART,
  product: IProduct
}

interface IDecreaseCartAction {
  type: ordersActions.DECREASE_CART,
  id: string
}

interface IRemoveFromCartAction {
  type: ordersActions.REMOVE_FROM_CART,
  id: string
}

interface IMakeOrderAction {
  type: ordersActions.MAKE_ORDER,
  CallApi: string,
  values: object,
  token: TokenType
}

interface IMakeOrderRequestAction {
  type: ordersActions.MAKE_ORDER_REQUEST,
}

interface IMakeOrderSuccessAction {
  type: ordersActions.MAKE_ORDER_SUCCESS,
  data: { order: IOrder }
}

interface IMakeOrderFailureAction {
  type: ordersActions.MAKE_ORDER_FAILURE,
  error: IError
}

export type orderActionType =
  IIncreaseCartAction
  | IDecreaseCartAction
  | IRemoveFromCartAction
  | IMakeOrderAction
  | IMakeOrderRequestAction
  | IMakeOrderSuccessAction
  | IMakeOrderFailureAction
  | IRouterLocationChangeAction