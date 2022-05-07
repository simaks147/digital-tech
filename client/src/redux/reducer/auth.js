import produce from "immer";

import {
  LOGIN,
  OAUTH,
  REQUEST,
  SUCCESS,
  FAILURE, OAUTH_CALLBACK
} from "../consts";

const token = localStorage.getItem('token') || null;

const initialState = {
  token,
  login: {
    processing: false,
    error: null
  },
  oauth: {
    processing: false,
    error: null
  },
  oauthCallback: {
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

      case OAUTH + REQUEST:
        draft.oauth.processing = true;
        break;

      case OAUTH + SUCCESS:
        draft.oauth.processing = false;
        window.location.href = data.location
        break;

      case OAUTH + FAILURE:
        draft.oauth.processing = false;
        draft.oauth.error = error;
        break;

      case OAUTH_CALLBACK + REQUEST:
        draft.oauthCallback.processing = true;
        break;

      case OAUTH_CALLBACK + SUCCESS:
        localStorage.setItem('token', data.token);
        draft.token = data.token;
        draft.oauthCallback.processing = false;
        break;

      case OAUTH_CALLBACK + FAILURE:
        draft.oauthCallback.processing = false;
        draft.oauthCallback.error = error;
        break;

      default:
        return state;
    }
  });
