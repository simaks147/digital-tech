import produce from "immer";
import { objToArr } from "../utils";
import { IOrdersState, ordersActions, orderActionType } from "../../types/orders";

const initialState: IOrdersState = {
  entities: {},
  processing: false,
  error: null,
  message: null
};

export default (state = initialState, action: orderActionType): IOrdersState =>
  produce(state, draft => {
    switch (action.type) {
      case ordersActions.INCREASE_CART:
        if (draft.entities[action.product.slug]) {
          draft.entities[action.product.slug].count = draft.entities[action.product.slug].count + 1;
        } else {
          draft.entities[action.product.slug] = { ...action.product, count: 1 };
        }
        break;

      case ordersActions.DECREASE_CART:
        if (draft.entities[action.id].count > 1) {
          draft.entities[action.id].count = draft.entities[action.id].count - 1;
        } else {
          delete draft.entities[action.id];
        }
        break;

      case ordersActions.REMOVE_FROM_CART:
        delete draft.entities[action.id];
        break;

      // case PROCESS_CHECKOUT:
      //
      //   break;
      //
      case ordersActions.MAKE_ORDER_REQUEST:
        draft.processing = true;
        break;

      case ordersActions.MAKE_ORDER_SUCCESS:
        draft.entities = {};
        draft.processing = false;
        draft.error = null;
        draft.message = action.data.order.message
        break;

      case ordersActions.MAKE_ORDER_FAILURE:
        draft.processing = false;
        draft.error = objToArr(action.error.error);
        break;

      case ordersActions.ROUTER_LOCATION_CHANGE:
        draft.error = null;
        break;

      default:
        return;
    }
  });
