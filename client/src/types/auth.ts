import {
  LOGIN as LOGIN_AUTH,
  OAUTH,
  REQUEST,
  SUCCESS,
  FAILURE,
  OAUTH_CALLBACK as OAUTH_CALLBACK_AUTH,
  REGISTER,
  CONFIRM as CONFIRM_AUTH,
  FETCH_PROFILE,
  CHECK_PROFILE,
  ROUTER_LOCATION_CHANGE
} from "../redux/consts";

export enum authActions {
  LOGIN_SUCCESS = LOGIN_AUTH + SUCCESS,
  CONFIRM_SUCCESS = CONFIRM_AUTH + SUCCESS,
  OAUTH_CALLBACK_SUCCESS = OAUTH_CALLBACK_AUTH + SUCCESS
}

export interface IAuthLoginSuccessAction {
  type: authActions.LOGIN_SUCCESS
}

export interface IAuthConfirmSuccessAction {
  type: authActions.CONFIRM_SUCCESS
}

export interface IAuthOauthCallbackSuccessAction {
  type: authActions.OAUTH_CALLBACK_SUCCESS
}

export type authActionType =
  IAuthLoginSuccessAction
  | IAuthConfirmSuccessAction
  | IAuthOauthCallbackSuccessAction