import {
  SUCCESS,
  LOAD_PRODUCTS,
} from "../consts";

// const initialState = {
//   entities: [],
//   loading: false,
//   loaded: false,
//   error: null
// }

export default (state = {}, action) => {
  const {type, id} = action;

  switch (type) {
    case LOAD_PRODUCTS + SUCCESS:
      return {...state, [id]: id};

    default:
      return state;
  }
}



