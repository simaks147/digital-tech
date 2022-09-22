import React, {useEffect, useState} from 'react';
import styles from "./chat.module.css";
import {ReactComponent as ChatIcon} from "../../icons/chat-icon.svg";
import {Form} from "react-bootstrap";
import Collapse from "react-bootstrap/Collapse";
import {io} from "socket.io-client";

let socket = null;

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket = io();

    socket.on('server_message', (msg) => console.log(msg));
  }, []);

  const handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      socket.emit('client_message', message);
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
          <div className={styles.messages}></div>
          <Form.Control placeholder="Submit message..." value={message} onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleEnterPress}/>
        </div>
      </Collapse>
    </div>
  );
};

export default Chat;
