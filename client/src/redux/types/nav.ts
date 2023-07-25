import {
  OPEN_NAV as OPEN,
  CLOSE_NAV as CLOSE,
  ROUTER_LOCATION_CHANGE as ROUTER_LOCATION
} from "../consts";

export interface INavState {
  active: boolean
}

export enum navActions {
  OPEN_NAV = OPEN,
  CLOSE_NAV = CLOSE,
  ROUTER_LOCATION_CHANGE = ROUTER_LOCATION
}

interface IOpenNavAction {
  type: navActions.OPEN_NAV
}

interface ICloseNavAction {
  type: navActions.CLOSE_NAV
}

interface IRouterLocationChangeAction {
  type: navActions.ROUTER_LOCATION_CHANGE
}

export type navActionType =
  IOpenNavAction
  | ICloseNavAction
  | IRouterLocationChangeAction

