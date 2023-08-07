import {
  LOGIN as LOG,
  OAUTH as OA,
  OAUTH_CALLBACK as OA_CALLBACK,
  REGISTER as REG,
  CONFIRM as CONF,
  FETCH_PROFILE as FETCH,
  REQUEST,
  SUCCESS,
  FAILURE,
  CHECK_PROFILE as CHECK
} from "../consts";
import { IError, IRouterLocationChangeAction, TokenType } from "./common";

interface IAuthCommon {
  processing: boolean,
  error: null | string[]
}

export interface IAuthState {
  token: TokenType,
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
  LOGIN = LOG,
  LOGIN_REQUEST = LOG + REQUEST,
  LOGIN_SUCCESS = LOG + SUCCESS,
  LOGIN_FAILURE = LOG + FAILURE,
  OAUTH = OA,
  OAUTH_REQUEST = OA + REQUEST,
  OAUTH_SUCCESS = OA + SUCCESS,
  OAUTH_FAILURE = OA + FAILURE,
  OAUTH_CALLBACK = OA_CALLBACK,
  OAUTH_CALLBACK_REQUEST = OA_CALLBACK + REQUEST,
  OAUTH_CALLBACK_SUCCESS = OA_CALLBACK + SUCCESS,
  OAUTH_CALLBACK_FAILURE = OA_CALLBACK + FAILURE,
  REGISTER = REG,
  REGISTER_REQUEST = REG + REQUEST,
  REGISTER_SUCCESS = REG + SUCCESS,
  REGISTER_FAILURE = REG + FAILURE,
  CONFIRM = CONF,
  CONFIRM_REQUEST = CONF + REQUEST,
  CONFIRM_SUCCESS = CONF + SUCCESS,
  CONFIRM_FAILURE = CONF + FAILURE,
  FETCH_PROFILE = FETCH,
  FETCH_PROFILE_REQUEST = FETCH + REQUEST,
  FETCH_PROFILE_SUCCESS = FETCH + SUCCESS,
  FETCH_PROFILE_FAILURE = FETCH + FAILURE,
  CHECK_PROFILE = CHECK
}



interface IAuthLoginAction {
  type: authActions.LOGIN,
  CallApi: string,
  values: object
}

interface IAuthLoginRequestAction {
  type: authActions.LOGIN_REQUEST,
}

export interface IAuthLoginSuccessAction {
  type: authActions.LOGIN_SUCCESS,
  data: { token: TokenType }
}

interface IAuthLoginFailureAction {
  type: authActions.LOGIN_FAILURE,
  error: IError
}



interface IAuthOauthAction {
  type: authActions.OAUTH,
  CallApi: string
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



interface IAuthOauthCallbackAction {
  type: authActions.OAUTH_CALLBACK,
  CallApi: string,
  values: object
}

interface IAuthOauthCallbackRequestAction {
  type: authActions.OAUTH_CALLBACK_REQUEST
}

export interface IAuthOauthCallbackSuccessAction {
  type: authActions.OAUTH_CALLBACK_SUCCESS,
  data: { token: TokenType }
}

interface IAuthOauthCallbackFailureAction {
  type: authActions.OAUTH_CALLBACK_FAILURE,
  error: IError
}



interface IAuthRegisterAction {
  type: authActions.REGISTER,
  CallApi: string,
  values: object
}

interface IAuthRegisterRequestAction {
  type: authActions.REGISTER_REQUEST,
}

interface IAuthRegisterSuccessAction {
  type: authActions.REGISTER_SUCCESS,
  data: { token: TokenType }
}

interface IAuthRegisterFailureAction {
  type: authActions.REGISTER_FAILURE,
  error: IError
}



interface IAuthConfirmAction {
  type: authActions.CONFIRM,
  CallApi: string,
  values: object
}

interface IAuthConfirmRequestAction {
  type: authActions.CONFIRM_REQUEST
}

export interface IAuthConfirmSuccessAction {
  type: authActions.CONFIRM_SUCCESS,
  data: { token: TokenType }
}

interface IAuthConfirmFailureAction {
  type: authActions.CONFIRM_FAILURE,
  error: IError
}


interface IAuthFetchProfileAction {
  type: authActions.FETCH_PROFILE,
  CallApi: string,
  token: TokenType
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



export type authActionType =
  IAuthLoginAction
  | IAuthLoginRequestAction
  | IAuthLoginSuccessAction
  | IAuthLoginFailureAction
  | IAuthOauthAction
  | IAuthOauthRequestAction
  | IAuthOauthSuccessAction
  | IAuthOauthFailureAction
  | IAuthOauthCallbackAction
  | IAuthOauthCallbackRequestAction
  | IAuthOauthCallbackSuccessAction
  | IAuthOauthCallbackFailureAction
  | IAuthRegisterAction
  | IAuthRegisterRequestAction
  | IAuthRegisterSuccessAction
  | IAuthRegisterFailureAction
  | IAuthConfirmAction
  | IAuthConfirmRequestAction
  | IAuthConfirmSuccessAction
  | IAuthConfirmFailureAction
  | IAuthFetchProfileAction
  | IAuthFetchProfileRequestAction
  | IAuthFetchProfileSuccessAction
  | IAuthFetchProfileFailureAction
  | IAuthCheckProfileAction
  | IRouterLocationChangeAction
