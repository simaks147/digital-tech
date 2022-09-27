import React, {useEffect, useState} from 'react';
import styles from "./chat.module.css";
import {ReactComponent as ChatIcon} from "../../icons/chat-icon.svg";
import {Form} from "react-bootstrap";
import Collapse from "react-bootstrap/Collapse";
import {io} from "socket.io-client";
import {connect} from "react-redux";
import {chatSelector, connectedChatSelector, profileSelector, tokenSelector} from "../../redux/selectors";
import {chatMessage, chatConnect, chatDisconnect} from "../../redux/actions";
import Message from "./message";
import {PropTypes as Types} from "prop-types";

let socket = null;

const Chat = ({messages, connected, chatMessage, chatConnect, chatDisconnect, token, profile}) => {
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

  const handleEnterPress = (e) => {
    if (connected && e.key === 'Enter') {
      const date = Date.now();

      const msg = {
        date,
        user: profile.displayName,
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
        <ChatIcon/>
      </div>
      <Collapse in={isOpen}>
        <div className={styles.body}>
          <div className={styles.messages}>
            {
              messages.map(msg => <Message key={msg.date} msg={msg}/>)
            }
          </div>
          <Form.Control placeholder="Submit message..." value={message} onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleEnterPress}/>
        </div>
      </Collapse>
    </div>
  );
};

Chat.propTypes = {
  messages: Types.arrayOf(Types.shape({
    date: Types.number.isRequired
  }).isRequired).isRequired,
  connected: Types.bool.isRequired,
  token: Types.string,
  profile: Types.shape({
    displayName: Types.string
  }).isRequired,
  chatMessage: Types.func.isRequired,
  chatConnect: Types.func.isRequired,
  chatDisconnect: Types.func.isRequired,
};

Chat.defaultProps = {
  token: null,
};

const mapStateToProps = (state) => ({
  messages: chatSelector(state),
  connected: connectedChatSelector(state),
  token: tokenSelector(state),
  profile: profileSelector(state)
});

export default connect(mapStateToProps, {chatMessage, chatConnect, chatDisconnect})(Chat);
