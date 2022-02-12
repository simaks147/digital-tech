import {
  INCREASE_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  // MAKE_ORDER,
  // PROCESS_CHECKOUT
} from "../consts";

import produce from "immer";

export default (state = {}, action) =>
  produce(state, draft => {
    const {type, id} = action;

    switch (type) {
      case INCREASE_CART:
        draft[id] = (draft[id] || 0) + 1;
        break;

      case DECREASE_CART:
        if (draft[id] > 1) {
          draft[id] = draft[id] - 1;
        } else {
          delete draft[id];
        }
        break;

      case REMOVE_FROM_CART:
        delete draft[id];
        break;

      // case PROCESS_CHECKOUT:
      //
      //   break;
      //
      // case MAKE_ORDER:
      //
      //   break;

      default:
        return;
    }
  });
