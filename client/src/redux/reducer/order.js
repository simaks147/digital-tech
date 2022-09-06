import {
  INCREASE_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  MAKE_ORDER,
  // PROCESS_CHECKOUT,
  REQUEST,
  SUCCESS,
  FAILURE, ROUTER_LOCATION_CHANGE
} from "../consts";
import produce from "immer";
import {objToArr} from "../utils";

const initialState = {
  entities: {},
  processing: false,
  error: null,
  message: null
};

export default (state = initialState, action) =>
  produce(state, draft => {
    const {type, id, product, error, data} = action;

    switch (type) {
      case INCREASE_CART:
        if (draft.entities[product.slug]) {
          draft.entities[product.slug].count = draft.entities[product.slug].count + 1;
        } else {
          draft.entities[product.slug] = {...product, count: 1};
        }
        break;

      case DECREASE_CART:
        if (draft.entities[id].count > 1) {
          draft.entities[id].count = draft.entities[id].count - 1;
        } else {
          delete draft.entities[id];
        }
        break;

      case REMOVE_FROM_CART:
        delete draft.entities[id];
        break;

      // case PROCESS_CHECKOUT:
      //
      //   break;
      //
      case MAKE_ORDER + REQUEST:
        draft.processing = true;
        break;

      case MAKE_ORDER + SUCCESS:
        draft.entities = {};
        draft.processing = false;
        draft.error = null;
        draft.message = data.order.message
        break;

      case MAKE_ORDER + FAILURE:
        draft.processing = false;
        draft.error = objToArr(error.error);
        break;

      case ROUTER_LOCATION_CHANGE:
        draft.error = null;
        break;

      default:
        return;
    }
  });
