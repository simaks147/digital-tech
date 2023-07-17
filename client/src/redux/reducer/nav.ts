import {
  OPEN_NAV,
  CLOSE_NAV,
  ROUTER_LOCATION_CHANGE
} from "../consts";

interface INavStateType {
  active: boolean
}

interface INavActionType {
  type: typeof OPEN_NAV | typeof CLOSE_NAV | typeof ROUTER_LOCATION_CHANGE,
  active: boolean
}

const initialState: INavStateType = {
  active: false
}

export default (state = initialState, action: INavActionType): INavStateType => {
  switch (action.type) {
    case OPEN_NAV:
      return { ...state, active: true }
    case CLOSE_NAV:
      return { ...state, active: false }
    case ROUTER_LOCATION_CHANGE:
      return { ...state, active: false }
    default:
      return state;
  }
}
