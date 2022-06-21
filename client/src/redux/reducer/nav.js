import {
  OPEN_NAV,
  CLOSE_NAV,
  ROUTER_LOCATION_CHANGE
} from "../consts";

const initialState = {
  active: false
}

export default (state = initialState, action) => {
  const {type} = action;

  switch (type) {
    case OPEN_NAV:
      return {...state, active: true}
    case CLOSE_NAV:
      return {...state, active: false}
    case ROUTER_LOCATION_CHANGE:
      return {...state, active: false}
    default:
      return state;
  }
}
