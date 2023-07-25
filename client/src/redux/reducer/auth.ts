import produce from "immer";
import { objToArr } from "../utils";
import { IAuthState, authActions, authActionType } from "../types/auth";

const token = localStorage.getItem('token') || null;

const initialState: IAuthState = {
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
    checked: false,
    data: {
      email: null,
      displayName: null,
      isAdmin: false
    },
    error: null
  }
};

export default (state = initialState, action: authActionType): IAuthState =>
  produce(state, draft => {
    switch (action.type) {
      case authActions.LOGIN_REQUEST:
        draft.profile.checked = false;
        draft.login.processing = true;
        break;

      case authActions.LOGIN_SUCCESS:
        localStorage.setItem('token', action.data.token);
        localStorage.removeItem('messages');
        draft.token = action.data.token;
        draft.login.processing = false;
        draft.login.error = null;
        break;

      case authActions.LOGIN_FAILURE:
        draft.profile.checked = true;
        draft.login.processing = false;
        draft.login.error = objToArr(action.error);
        break;



      case authActions.OAUTH_REQUEST:
        draft.oauth.processing = true;
        break;

      case authActions.OAUTH_SUCCESS:
        draft.oauth.processing = false;
        draft.oauth.error = null;
        window.location.href = action.data.location
        break;

      case authActions.OAUTH_FAILURE:
        draft.oauth.processing = false;
        draft.oauth.error = objToArr(action.error.error);
        break;



      case authActions.OAUTH_CALLBACK_REQUEST:
        draft.oauthCallback.processing = true;
        break;

      case authActions.OAUTH_CALLBACK_SUCCESS:
        localStorage.setItem('token', action.data.token);
        localStorage.removeItem('messages');
        draft.token = action.data.token;
        draft.oauthCallback.processing = false;
        draft.oauthCallback.error = null;
        break;

      case authActions.OAUTH_CALLBACK_FAILURE:
        draft.oauthCallback.processing = false;
        draft.oauthCallback.error = objToArr(action.error.error);
        break;



      case authActions.REGISTER_REQUEST:
        draft.profile.checked = false;
        draft.registration.processing = true;
        break;

      case authActions.REGISTER_SUCCESS:
        draft.profile.checked = true;
        localStorage.setItem('token', action.data.token);
        localStorage.removeItem('messages');
        draft.token = action.data.token;
        draft.registration.complete = true;
        draft.registration.processing = false;
        draft.registration.error = null;
        break;

      case authActions.REGISTER_FAILURE:
        draft.profile.checked = true;
        draft.registration.processing = false;
        draft.registration.error = objToArr(action.error.error);
        break;



      case authActions.CONFIRM_REQUEST:
        draft.confirmation.processing = true;
        break;

      case authActions.CONFIRM_SUCCESS:
        localStorage.setItem('token', action.data.token);
        localStorage.removeItem('messages');
        draft.token = action.data.token;
        draft.confirmation.processing = false;
        draft.confirmation.error = null;
        break;

      case authActions.CONFIRM_FAILURE:
        draft.confirmation.processing = false;
        draft.confirmation.error = objToArr(action.error.error);
        break;



      case authActions.FETCH_PROFILE_REQUEST:
        draft.profile.fetching = true;
        break;

      case authActions.FETCH_PROFILE_SUCCESS:
        draft.profile.data = action.data;
        draft.profile.fetching = false;
        break;

      case authActions.FETCH_PROFILE_FAILURE:
        draft.profile.fetching = false;
        draft.profile.error = objToArr(action.error.error);
        break;



      case authActions.CHECK_PROFILE:
        draft.profile.checked = true;
        break;

      case authActions.ROUTER_LOCATION_CHANGE:
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
