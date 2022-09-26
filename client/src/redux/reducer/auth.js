import produce from "immer";
import {objToArr} from "../utils";

import {
  LOGIN,
  OAUTH,
  REQUEST,
  SUCCESS,
  FAILURE,
  OAUTH_CALLBACK,
  REGISTER,
  CONFIRM,
  FETCH_PROFILE,
  ROUTER_LOCATION_CHANGE
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
  },
  registration: {
    processing: false,
    error: null,
    complete: false
  },
  confirmation: {
    processing: false,
    error: null
  },
  profile: {
    fetching: false,
    data: null,
    error: null
  }
};

export default (state = initialState, action) =>
  produce(state, draft => {
    const {type, data, error} = action;

    switch (type) {
      case LOGIN + REQUEST:
        draft.login.processing = true;
        break;

      case LOGIN + SUCCESS:
        localStorage.setItem('token', data.token);
        localStorage.removeItem('messages');
        draft.token = data.token;
        draft.login.processing = false;
        draft.login.error = null;
        break;

      case LOGIN + FAILURE:
        draft.login.processing = false;
        draft.login.error = objToArr(error.error);
        break;

      case OAUTH + REQUEST:
        draft.oauth.processing = true;
        break;

      case OAUTH + SUCCESS:
        draft.oauth.processing = false;
        draft.oauth.error = null;
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
        localStorage.removeItem('messages');
        draft.token = data.token;
        draft.oauthCallback.processing = false;
        draft.oauthCallback.error = null;
        break;

      case OAUTH_CALLBACK + FAILURE:
        draft.oauthCallback.processing = false;
        draft.oauthCallback.error = objToArr(error.error);
        break;

      case REGISTER + REQUEST:
        draft.registration.processing = true;
        break;

      case REGISTER + SUCCESS:
        draft.registration.complete = true;
        draft.registration.processing = false;
        draft.registration.error = null;
        break;

      case REGISTER + FAILURE:
        draft.registration.processing = false;
        draft.registration.error = objToArr(error.error);
        break;

      case CONFIRM + REQUEST:
        draft.confirmation.processing = true;
        break;

      case CONFIRM + SUCCESS:
        localStorage.setItem('token', data.token);
        localStorage.removeItem('messages');
        draft.token = data.token;
        draft.confirmation.processing = false;
        draft.confirmation.error = null;
        break;

      case CONFIRM + FAILURE:
        draft.confirmation.processing = false;
        draft.confirmation.error = objToArr(error.error);
        break;

      case FETCH_PROFILE + REQUEST:
        draft.profile.fetching = true;
        break;

      case FETCH_PROFILE + SUCCESS:
        draft.profile = data;
        draft.profile.fetching = false;
        break;

      case FETCH_PROFILE + FAILURE:
        draft.profile.fetching = false;
        draft.profile.error = objToArr(error.error);
        break;

      case ROUTER_LOCATION_CHANGE:
        draft.login.error = null;
        draft.oauth.error = null;
        draft.oauthCallback.error = null;
        draft.registration.error = null;
        draft.confirmation.error = null;
        break;

      default:
        return state;
    }
  });
