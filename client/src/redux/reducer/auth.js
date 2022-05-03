import produce from "immer";

import {
  LOGIN,
  REQUEST,
  SUCCESS,
  FAILURE
} from "../consts";

const token = localStorage.getItem('token') || null;

const initialState = {
  token,
  login: {
    processing: false,
    error: null
  }
}

export default (state = initialState, action) =>
  produce(state, draft => {
    const {type, data, error} = action;

    switch (type) {
      case LOGIN + REQUEST:
        draft.login.processing = true;
        break;

      case LOGIN + SUCCESS:
        localStorage.setItem('token', data.token);
        draft.token = data.token;
        draft.login.processing = false;
        break;

      case LOGIN + FAILURE:
        draft.login.processing = false;
        draft.login.error = error;
        break;

      default:
        return state;
    }
  });
