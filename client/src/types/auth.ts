import {
  LOGIN,
  OAUTH,
  OAUTH_CALLBACK,
  REGISTER,
  CONFIRM,
  FETCH_PROFILE,
  REQUEST,
  SUCCESS,
  FAILURE,
  CHECK_PROFILE as CHECK,
  ROUTER_LOCATION_CHANGE as ROUTER_LOCATION
} from "../redux/consts";

interface IAuthCommon {
  processing: boolean,
  error: null | string[]
}

export interface IAuthState {
  token: null | string,
  login: IAuthCommon,
  oauth: IAuthCommon,
  oauthCallback: IAuthCommon,
  registration: IAuthCommon & { complete: boolean },
  confirmation: IAuthCommon,
  profile: {
    fetching: boolean,
    checked: boolean,
    data: {
      email: null | string,
      displayName: null | string,
      isAdmin: boolean
    },
    error: null | string[]
  }
}

export enum authActions {
  LOGIN_REQUEST = LOGIN + REQUEST,
  LOGIN_SUCCESS = LOGIN + SUCCESS,
  LOGIN_FAILURE = LOGIN + FAILURE,
  OAUTH_REQUEST = OAUTH + REQUEST,
  OAUTH_SUCCESS = OAUTH + SUCCESS,
  OAUTH_FAILURE = OAUTH + FAILURE,
  OAUTH_CALLBACK_REQUEST = OAUTH_CALLBACK + REQUEST,
  OAUTH_CALLBACK_SUCCESS = OAUTH_CALLBACK + SUCCESS,
  OAUTH_CALLBACK_FAILURE = OAUTH_CALLBACK + FAILURE,
  REGISTER_REQUEST = REGISTER + REQUEST,
  REGISTER_SUCCESS = REGISTER + SUCCESS,
  REGISTER_FAILURE = REGISTER + FAILURE,
  CONFIRM_REQUEST = CONFIRM + REQUEST,
  CONFIRM_SUCCESS = CONFIRM + SUCCESS,
  CONFIRM_FAILURE = CONFIRM + FAILURE,
  FETCH_PROFILE_REQUEST = FETCH_PROFILE + REQUEST,
  FETCH_PROFILE_SUCCESS = FETCH_PROFILE + SUCCESS,
  FETCH_PROFILE_FAILURE = FETCH_PROFILE + FAILURE,
  CHECK_PROFILE = CHECK,
  ROUTER_LOCATION_CHANGE = ROUTER_LOCATION
}

interface IToken { token: string }

interface IError { error: { [key: string]: string } }



interface IAuthLoginRequestAction {
  type: authActions.LOGIN_REQUEST,
}

export interface IAuthLoginSuccessAction {
  type: authActions.LOGIN_SUCCESS,
  data: IToken
}

interface IAuthLoginFailureAction {
  type: authActions.LOGIN_FAILURE,
  error: IError
}



interface IAuthOauthRequestAction {
  type: authActions.OAUTH_REQUEST
}

interface IAuthOauthSuccessAction {
  type: authActions.OAUTH_SUCCESS,
  data: { location: string }
}

interface IAuthOauthFailureAction {
  type: authActions.OAUTH_FAILURE,
  error: IError
}



interface IAuthOauthCallbackRequestAction {
  type: authActions.OAUTH_CALLBACK_REQUEST
}

export interface IAuthOauthCallbackSuccessAction {
  type: authActions.OAUTH_CALLBACK_SUCCESS,
  data: IToken
}

interface IAuthOauthCallbackFailureAction {
  type: authActions.OAUTH_CALLBACK_FAILURE,
  error: IError
}



interface IAuthRegisterRequestAction {
  type: authActions.REGISTER_REQUEST
}

interface IAuthRegisterSuccessAction {
  type: authActions.REGISTER_SUCCESS,
  data: IToken
}

interface IAuthRegisterFailureAction {
  type: authActions.REGISTER_FAILURE,
  error: IError
}



interface IAuthConfirmRequestAction {
  type: authActions.CONFIRM_REQUEST
}

export interface IAuthConfirmSuccessAction {
  type: authActions.CONFIRM_SUCCESS,
  data: IToken
}

interface IAuthConfirmFailureAction {
  type: authActions.CONFIRM_FAILURE,
  error: IError
}



interface IAuthFetchProfileRequestAction {
  type: authActions.FETCH_PROFILE_REQUEST
}

interface IAuthFetchProfileSuccessAction {
  type: authActions.FETCH_PROFILE_SUCCESS,
  data: {
    email: string,
    displayName: string,
    isAdmin: boolean
  }
}

interface IAuthFetchProfileFailureAction {
  type: authActions.FETCH_PROFILE_FAILURE,
  error: IError
}



interface IAuthCheckProfileAction {
  type: authActions.CHECK_PROFILE
}

interface IRouterLocationChangeAction {
  type: authActions.ROUTER_LOCATION_CHANGE
}



export type authActionType =
  IAuthLoginRequestAction
  | IAuthLoginSuccessAction
  | IAuthLoginFailureAction
  | IAuthOauthRequestAction
  | IAuthOauthSuccessAction
  | IAuthOauthFailureAction
  | IAuthOauthCallbackRequestAction
  | IAuthOauthCallbackSuccessAction
  | IAuthOauthCallbackFailureAction
  | IAuthRegisterRequestAction
  | IAuthRegisterSuccessAction
  | IAuthRegisterFailureAction
  | IAuthConfirmRequestAction
  | IAuthConfirmSuccessAction
  | IAuthConfirmFailureAction
  | IAuthFetchProfileRequestAction
  | IAuthFetchProfileSuccessAction
  | IAuthFetchProfileFailureAction
  | IAuthCheckProfileAction
  | IRouterLocationChangeAction
