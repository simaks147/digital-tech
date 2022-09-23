import React from 'react';
import styles from "../chat.module.css";

const Message = ({msg}) => (
  <div className={styles.msg}>
    <div className={styles.msgDate}>{msg.date}</div>
    <div className={styles.msgUser}>{msg.user}</div>
    <div className={styles.msgText}>{msg.text}</div>
  </div>
);

export default Message;
