import React, { FC, KeyboardEvent, useEffect, useState } from 'react';
import styles from "./chat.module.css";
import { ReactComponent as ChatIcon } from "../../icons/chat-icon.svg";
import { Form } from "react-bootstrap";
import Collapse from "react-bootstrap/Collapse";
import { Socket, io } from "socket.io-client";
import { connect, ConnectedProps } from "react-redux";
import {
  chatSelector,
  connectedChatSelector,
  dataProfileSelector,
  tokenSelector
} from "../../redux/selectors";
import { chatMessage, chatConnect, chatDisconnect } from "../../redux/actions";
import Message from "./message";
import { RootStateType } from '../../redux/store';
import { IMessage } from '../../redux/types/chat';

let socket: Socket = null!;

interface IProps extends PropsFromRedux { }

const Chat: FC<IProps> = ({ messages, connected, chatMessage, chatConnect, chatDisconnect, token, dataProfile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket = io({
      extraHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });

    socket.on('server_message', msg => chatMessage(msg));
    socket.on('connect', chatConnect);
    socket.on('disconnect', chatDisconnect);
  }, []);

  const handleEnterPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (connected && e.key === 'Enter') {
      const date = Date.now();

      const msg: IMessage = {
        date,
        user: dataProfile.displayName,
        text: message,
      };

      socket.emit('client_message', msg);

      chatMessage(msg);

      setMessage('');
    }
  }

  return (
    <div className={styles.main}>
      <div className={styles.header} onClick={() => setIsOpen(!isOpen)}>
        <div>Have a question?</div>
        <ChatIcon />
      </div>
      <Collapse in={isOpen}>
        <div>
          <div className={styles.messages}>
            {
              messages.map(msg => <Message key={msg.date} msg={msg} />)
            }
          </div>
          <Form.Control placeholder="Submit message..." value={message} onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleEnterPress} />
        </div>
      </Collapse>
    </div>
  );
};

Chat.defaultProps = {
  token: null,
};

const mapStateToProps = (state: RootStateType) => ({
  messages: chatSelector(state),
  connected: connectedChatSelector(state),
  token: tokenSelector(state),
  dataProfile: dataProfileSelector(state)
});

const connector = connect(mapStateToProps, { chatMessage, chatConnect, chatDisconnect });

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(Chat);
