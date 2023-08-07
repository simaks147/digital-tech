import {
  OPEN_NAV as OPEN,
  CLOSE_NAV as CLOSE
} from "../consts";
import { IRouterLocationChangeAction } from "./common";

export interface INavState {
  active: boolean
}

export enum navActions {
  OPEN_NAV = OPEN,
  CLOSE_NAV = CLOSE
}

interface IOpenNavAction {
  type: navActions.OPEN_NAV
}

interface ICloseNavAction {
  type: navActions.CLOSE_NAV
}

export type navActionType =
  IOpenNavAction
  | ICloseNavAction
  | IRouterLocationChangeAction

