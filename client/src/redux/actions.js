import {
  INCREASE_CART,
  DECREASE_CART,
  REMOVE_FROM_CART
} from "./consts";

export const increaseCart = (id) => ({
  type: INCREASE_CART,
  id
});

export const decreaseCart = (id) => ({
  type: DECREASE_CART,
  id
});

export const removeFromCart = (id) => ({
  type: REMOVE_FROM_CART,
  id
});
