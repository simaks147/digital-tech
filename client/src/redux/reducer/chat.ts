import { authActions } from "../types/auth";
import { IChatState, chatActionType, chatActions } from "../types/chat";

const storageMessages = JSON.parse(localStorage.getItem('messages') || '[]');

const initialState: IChatState = {
  entities: storageMessages,
  connected: false,
}

export default (state = initialState, action: chatActionType): IChatState => {
  switch (action.type) {
    case chatActions.CHAT_MESSAGE:
      // const messages = [].concat(msg, state.entities);
      const messages = [action.msg, ...state.entities]
      localStorage.setItem('messages', JSON.stringify(messages));
      return { ...state, entities: messages };
    case chatActions.CHAT_CONNECT:
      return { ...state, connected: true };
    case chatActions.CHAT_DISCONNECT:
      return { ...state, connected: false };
    case authActions.OAUTH_CALLBACK_SUCCESS:
    case authActions.CONFIRM_SUCCESS:
    case authActions.LOGIN_SUCCESS:
      return { ...state, entities: [] };
    default:
      return state;
  }
}
