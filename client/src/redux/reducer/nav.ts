import { ROUTER_LOCATION_CHANGE } from "../consts"
import { INavState, navActions, navActionType } from "../types/nav"

const initialState: INavState = {
  active: false
}

export default (state = initialState, action: navActionType): INavState => {
  switch (action.type) {
    case navActions.OPEN_NAV:
      return { ...state, active: true }
    case navActions.CLOSE_NAV:
      return { ...state, active: false }
    case ROUTER_LOCATION_CHANGE:
      return { ...state, active: false }
    default:
      return state;
  }
}
