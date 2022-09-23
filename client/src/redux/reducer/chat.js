import {
  CHAT_MESSAGE,
  CHAT_CONNECT,
  CHAT_DISCONNECT
} from "../consts";

const storageMessages = JSON.parse(localStorage.getItem('messages')) || [];

const initialState = {
  entities: storageMessages,
  connected: false,
}

export default (state = initialState, action) => {
  const {type, msg} = action;

  switch (type) {
    case CHAT_MESSAGE:
      const messages = [].concat(msg, state.entities);
      localStorage.setItem('messages', JSON.stringify(messages));
      return {...state, entities: messages};
    case CHAT_CONNECT:
      return {...state, connected: true};
    case CHAT_DISCONNECT:
      return {...state, connected: false};
    default:
      return state;
  }
}
