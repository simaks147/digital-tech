import {
  INCREASE_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  MAKE_ORDER,
  PROCESS_CHECKOUT
} from "../consts";

import produce from "immer";

const InitialState = {
  entities: {},
  activeBasketView: 'Shopping Cart'
}

export default (state = InitialState, action) =>
  produce(state, draft => {
    const {type, id, activeBasketView} = action;

    switch (type) {
      case INCREASE_CART:
        draft.entities[id] = (draft.entities[id] || 0) + 1;
        break;

      case DECREASE_CART:
        if (draft.entities[id] > 1) {
          draft.entities[id] = draft.entities[id] - 1;
        } else {
          delete draft.entities[id];
        }
        break;

      case REMOVE_FROM_CART:
        delete draft.entities[id];
        break;

      case PROCESS_CHECKOUT:
        draft.activeBasketView = activeBasketView;
        break;

      case MAKE_ORDER:
        draft.activeBasketView = activeBasketView;
        break;

      default:
        return;
    }
  });
