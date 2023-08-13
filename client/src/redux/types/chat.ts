import {
  CHAT_MESSAGE as MESSAGE,
  CHAT_CONNECT as CONNECT,
  CHAT_DISCONNECT as DISCONNECT
} from "../consts";
import {
  IAuthConfirmSuccessAction,
  IAuthLoginSuccessAction,
  IAuthOauthCallbackSuccessAction
} from "./auth";

export interface IMessage {
  date: number,
  user: string | null,
  text: string
}

export interface IChatState {
  entities: IMessage[],
  connected: boolean
}

export enum chatActions {
  CHAT_MESSAGE = MESSAGE,
  CHAT_CONNECT = CONNECT,
  CHAT_DISCONNECT = DISCONNECT
}

interface IChatMessageAction {
  type: chatActions.CHAT_MESSAGE,
  msg: IMessage
}

interface IChatConnectAction {
  type: chatActions.CHAT_CONNECT
}

interface IChatDisconnectAction {
  type: chatActions.CHAT_DISCONNECT
}

export type chatActionType =
  IChatMessageAction
  | IChatConnectAction
  | IChatDisconnectAction
  | IAuthConfirmSuccessAction
  | IAuthLoginSuccessAction
  | IAuthOauthCallbackSuccessAction