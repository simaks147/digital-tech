import {
  INCREASE_CART as INCREASE,
  DECREASE_CART as DECREASE,
  REMOVE_FROM_CART as REMOVE,
  MAKE_ORDER,
  // PROCESS_CHECKOUT,
  REQUEST,
  SUCCESS,
  FAILURE,
  ROUTER_LOCATION_CHANGE as ROUTER_LOCATION
} from "../redux/consts";

interface IOrder {
  id: string,
  message: string
}

export interface IOrdersState {
  entities: {
    [key: string]: {
      slug: string,
      count: number
    }
  },
  processing: boolean,
  error: null | string[],
  message: null | string
}

export enum ordersActions {
  INCREASE_CART = INCREASE,
  DECREASE_CART = DECREASE,
  REMOVE_FROM_CART = REMOVE,
  MAKE_ORDER_REQUEST = MAKE_ORDER + REQUEST,
  MAKE_ORDER_SUCCESS = MAKE_ORDER + SUCCESS,
  MAKE_ORDER_FAILURE = MAKE_ORDER + FAILURE,
  ROUTER_LOCATION_CHANGE = ROUTER_LOCATION
}

interface IIncreaseCartAction {
  type: ordersActions.INCREASE_CART,
  product: {
    slug: string,
    count: number
  }
}

interface IDecreaseCartAction {
  type: ordersActions.DECREASE_CART,
  id: string
}

interface IRemoveFromCartAction {
  type: ordersActions.REMOVE_FROM_CART,
  id: string
}

interface IMakeOrderRequestAction {
  type: ordersActions.MAKE_ORDER_REQUEST
}

interface IMakeOrderSuccessAction {
  type: ordersActions.MAKE_ORDER_SUCCESS,
  data: { order: IOrder }
}

interface IMakeOrderFailureAction {
  type: ordersActions.MAKE_ORDER_FAILURE,
  error: { error: { [key: string]: string } }
}

interface IRouterLocationChangeAction {
  type: ordersActions.ROUTER_LOCATION_CHANGE
}

export type orderActionType =
  IIncreaseCartAction
  | IDecreaseCartAction
  | IRemoveFromCartAction
  | IMakeOrderRequestAction
  | IMakeOrderSuccessAction
  | IMakeOrderFailureAction
  | IRouterLocationChangeAction