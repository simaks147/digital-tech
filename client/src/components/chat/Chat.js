import React, {useEffect, useState} from 'react';
import styles from "./chat.module.css";
import {ReactComponent as ChatIcon} from "../../icons/chat-icon.svg";
import {Form} from "react-bootstrap";
import Collapse from "react-bootstrap/Collapse";
import {io} from "socket.io-client";
import {connect} from "react-redux";
import {chatSelector, connectedChatSelector} from "../../redux/selectors";
import {chatMessage, chatConnect, chatDisconnect} from "../../redux/actions";
import Message from "./message";

let socket = null;

const Chat = ({messages, connected, chatMessage, chatConnect, chatDisconnect}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket = io();

    socket.on('server_message', msg => chatMessage(msg));
    socket.on('connect', chatConnect);
    socket.on('disconnect', chatDisconnect);
  }, []);

  const handleEnterPress = (e) => {
    if (connected && e.key === 'Enter') {
      const msg = {
        id: Date.now(),
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric', month: 'long', day: 'numeric'
        }),
        user: 'User',
        text: message
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
        <ChatIcon/>
      </div>
      <Collapse in={isOpen}>
        <div className={styles.body}>
          <div className={styles.messages}>
            {
              messages.map(msg => <Message key={msg.id} msg={msg}/>)
            }
          </div>
          <Form.Control placeholder="Submit message..." value={message} onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleEnterPress}/>
        </div>
      </Collapse>
    </div>
  );
};

const mapStateToProps = (state,) => ({
  messages: chatSelector(state),
  connected: connectedChatSelector(state)
});

export default connect(mapStateToProps, {chatMessage, chatConnect, chatDisconnect})(Chat);
