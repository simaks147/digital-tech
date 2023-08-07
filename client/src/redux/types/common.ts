import { AnyAction } from "redux"
import { ThunkAction } from "redux-thunk"
import { RootStateType } from "../store"
import { ROUTER_LOCATION_CHANGE } from "../consts"

export type TokenType = string | null

export interface IError {
  error: { [key: string]: string }
}

export interface IRouterLocationChangeAction {
  type: typeof ROUTER_LOCATION_CHANGE
}

export type AsyncActionType = ThunkAction<void, RootStateType, unknown, AnyAction>